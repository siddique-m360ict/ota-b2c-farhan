"use client"

const ErrorBoundary = ({ error }: { error: Error }) => {
  return <div>Register: {error.message}</div>
}

export default ErrorBoundary
