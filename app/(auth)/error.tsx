"use client"

const ErrorBoundary = ({ error }: { error: Error }) => {
  return <div>auth: {error.message}</div>
}

export default ErrorBoundary
