import {v4 as uuid} from 'uuid'

export const cleanAndTransformBlocks = (blocksJSON) => {
    const blocks = JSON.parse(JSON.stringify(blocksJSON))

    const assignIds = (b) => {
        b.forEach(block => {
            block.id = uuid()
            if (block.innerBlock?.length) {
                assignIds(block.innerBlock)
            }
        });
    }

    assignIds(blocks)
    
  return blocks
}

