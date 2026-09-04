import { getFeedbackUrl } from '../lib/feedback'

type FeedbackLinkProps = {
  className?: string
}

export function FeedbackLink({ className = '' }: FeedbackLinkProps) {
  const feedbackUrl = getFeedbackUrl()
  if (!feedbackUrl) return null

  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-sm font-bold text-ghost-teal transition hover:bg-white/70 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ghost-teal ${className}`}
      href={feedbackUrl}
      rel="noreferrer noopener"
      target="_blank"
    >
      Dejar feedback <span aria-hidden="true" className="ml-1">↗</span>
    </a>
  )
}
