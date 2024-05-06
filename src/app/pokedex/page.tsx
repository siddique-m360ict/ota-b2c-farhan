import * as React from "react"
import { SearchInput } from "./search-input"

import { headers } from "next/headers"
import Image from "next/image"
import { cn, wait } from "@/lib/utils"

type Pokemon = {
  name: string
  id: number
}

function isSSR() {
  return headers().get("accept")?.includes("text/html") // for RSC navigations, it uses either `Accept: text/x-component` or `Accept: */*`, for SSR browsers and other client use `Accept: text/html`
}

export function generateMetadata(props: {
  searchParams?: Record<string, string | undefined>
}) {
  const query = props.searchParams?.search
  return {
    title: query ? `Searching for ${query}` : "Search page",
  }
}

export default function Page(props: {
  searchParams?: Record<string, string | undefined>
}) {
  const keyString = `search=${props.searchParams?.search}&wait=${props.searchParams?.wait}`
  return (
    <section className="flex flex-col">
      <SearchInput />

      {props.searchParams?.search &&
        (isSSR() ? (
          "ssr page"
        ) : (
          <React.Suspense
            key={keyString}
            fallback={
              <ul className="grid place-items-stretch gap-4 py-4 pb-52 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
              </ul>
            }
          >
            <PokemonList
              name={props.searchParams?.search}
              wait={props.searchParams?.wait === "on"}
            />
          </React.Suspense>
        ))}
    </section>
  )
}

async function PokemonList(props: { name: string; wait: boolean }) {
  if (props.wait) {
    await wait(2000)
  }
  const pokemons = await fetch(`https://beta.pokeapi.co/graphql/v1beta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: /* GraphQL */ `
        query ($name: String!) {
          pokemons: pokemon_v2_pokemon(
            where: { name: { _ilike: $name } }
            limit: 20
          ) {
            name
            id
          }
        }
      `,
      variables: {
        name: `${props.name}%`,
      },
    }),
  })
    .then(
      (r) =>
        r.json() as Promise<{
          data: { pokemons: Array<Pokemon> }
        }>
    )
    .then((result) => result.data?.pokemons ?? [])

  return (
    <ul
      className={cn(
        "grid place-items-stretch gap-4 py-4 pb-52 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6",
        pokemons.length === 0 && "h-hull w-full items-center justify-center"
      )}
    >
      {pokemons.map((p) => (
        <li key={p.id}>
          <PokemonCard pokemon={p} />
        </li>
      ))}
    </ul>
  )
}

function PokemonCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-gray-200 bg-gray-600 p-2 font-normal">
      <span className="sr-only">Loading pokemon...</span>
      <div className="flex h-4 animate-pulse gap-2 rounded bg-slate-400" />

      <div className="h-[200px] w-full animate-pulse rounded bg-slate-400" />

      <div className="flex h-4 animate-pulse gap-2 rounded bg-slate-400" />
    </div>
  )
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const pokemonPNGURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  return (
    <dl className="flex flex-col gap-4 rounded-md border border-gray-200 bg-gray-600 p-2 font-normal">
      <div className="flex items-center justify-center gap-2">
        <dt>ID : </dt>
        <dd>
          <strong>{pokemon.id}</strong>
        </dd>
      </div>

      <Image
        width={200}
        height={200}
        src={pokemonPNGURL}
        alt={pokemon.name}
        className="z-1 relative h-[200px] w-[200px] self-center drop-shadow-md"
      />

      <div className="flex items-center justify-center gap-2">
        <dt>Name: </dt>
        <dd>{pokemon.name}</dd>
      </div>
    </dl>
  )
}
