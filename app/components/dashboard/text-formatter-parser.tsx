"use client"

interface FormattedNode {
  type: "text" | "bold" | "italic" | "underline" | "color"
  content: string | FormattedNode[]
  color?: string
}

export function parseFormattedText(text: string): FormattedNode[] {
  if (!text) return []

  const parseSegment = (segment: string): FormattedNode[] => {
    if (!segment) return []

    const result: FormattedNode[] = []

    const patterns = [
      { regex: /\*\*(.*?)\*\*/g, type: "bold" as const },
      { regex: /__(.*?)__/g, type: "underline" as const },
      { regex: /\[(#[0-9a-f]{6})\](.*?)\[\/\]/gi, type: "color" as const },
      { regex: /\*(.*?)\*/g, type: "italic" as const },
    ]

    let matches: Array<{ index: number; type: string; content: string; color?: string; fullMatch: string }> = []

    for (const { regex, type } of patterns) {
      let m
      const globalRegex = new RegExp(regex.source, 'g')
      while ((m = globalRegex.exec(segment)) !== null) {
        if (type === "color") {
          matches.push({
            index: m.index,
            type,
            content: m[2],
            color: m[1],
            fullMatch: m[0],
          })
        } else {
          matches.push({
            index: m.index,
            type,
            content: m[1],
            fullMatch: m[0],
          })
        }
      }
    }

    if (matches.length === 0) {
      return [{ type: "text", content: segment }]
    }

    matches.sort((a, b) => a.index - b.index)
    const first = matches[0]

    if (first.index > 0) {
      result.push({
        type: "text",
        content: segment.substring(0, first.index),
      })
    }

    if (first.type === "color") {
      result.push({
        type: "color",
        content: parseSegment(first.content),
        color: first.color,
      })
    } else {
      result.push({
        type: first.type,
        content: parseSegment(first.content),
      })
    }

    const remaining = segment.substring(first.index + first.fullMatch.length)
    result.push(...parseSegment(remaining))

    return result
  }

  return parseSegment(text)
}

interface RenderProps {
  nodes: FormattedNode[]
}

export function RenderFormattedText({ nodes }: RenderProps) {
  return (
    <>
      {nodes.map((node, idx) => {
        if (node.type === "text") {
          return <span key={idx}>{node.content}</span>
        } else if (node.type === "bold") {
          return (
            <strong key={idx}>
              <RenderFormattedText
                nodes={Array.isArray(node.content) ? node.content : []}
              />
            </strong>
          )
        } else if (node.type === "italic") {
          return (
            <em key={idx}>
              <RenderFormattedText
                nodes={Array.isArray(node.content) ? node.content : []}
              />
            </em>
          )
        } else if (node.type === "underline") {
          return (
            <u key={idx}>
              <RenderFormattedText
                nodes={Array.isArray(node.content) ? node.content : []}
              />
            </u>
          )
        } else if (node.type === "color") {
          return (
            <span key={idx} style={{ color: node.color }}>
              <RenderFormattedText
                nodes={Array.isArray(node.content) ? node.content : []}
              />
            </span>
          )
        }
      })}
    </>
  )
}
