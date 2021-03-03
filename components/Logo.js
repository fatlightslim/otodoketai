import Link from "next/link"

export default function Logo({ className, name = process.env.site.name}) {
  let classes = "dosis text-2xl "
  if (className) classes += ` ${className}`
  return (
    <Link href="/">
      <a className={classes}>{name}</a>
    </Link>
  )
}
