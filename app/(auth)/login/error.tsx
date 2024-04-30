"use client"

const ErrorBoundary = ({ error }: { error: Error }) => {
  return <div>login: {error.message}</div>
}

export default ErrorBoundary
