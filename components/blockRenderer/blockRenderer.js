import { Cover } from "components/cover"
import { Heading } from "components/heading"
import { Paragraph } from "components/paragraph"
import { theme } from "theme"

export const BlockRenderer = ({blocks}) => {
    return blocks.map((block) => {
        switch (block.name) {
            case "core/paragraph": {
                return (
                    <Paragraph
                        key={block.id} 
                        content={block.attributes.content}
                        textAlign={block.attributes.align}
                        textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
                    />
                )                
            }
            case "core/heading": {
                return (
                    <Heading 
                        key={block.id} 
                        level={block.attributes.level} 
                        content={block.attributes.content}
                        textAlign={block.attributes.textAlign}
                    />
                )                    
            }
            case "core/cover": {
                return (
                    <Cover key={block.id} background={block.attributes.url} >                    
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Cover>
                )                
            }
            default:
                return null
        }
    })
}