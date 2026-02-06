/**
 * A configuration object for our HTTP client, similar to Axios.
 */
export interface ApiClientConfig extends Omit<RequestInit, "body"> {
  params?: Record<string, any>
  data?: any // Replaces `body` for a more Axios-like feel
}

/**
 * A custom error class that holds the response object and status.
 * TanStack Query will receive this error on promise rejection.
 */
export class HttpError extends Error {
  response: Response
  status: number
  data?: any

  constructor(response: Response, data?: any) {
    // Use the message from the API response if available, otherwise use status text
    const message =
      data?.message || `HTTP Error: ${response.status} ${response.statusText}`
    super(message)
    this.name = "HttpError"
    this.response = response
    this.status = response.status
    this.data = data
  }
}
