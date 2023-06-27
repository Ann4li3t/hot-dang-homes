import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/blockRenderer";
import { MainMenu } from "components/mainMenu";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { mapMainMenuItems } from "utils/mapMainMenuItem"

export default function Home(props) {
  console.log("PROPS: ", props)
  return <div>
    <MainMenu items={props.mainMenuItems} />
    <BlockRenderer blocks={props.blocks}/>
  </div>;
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PageQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            title
            blocks
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            menuItems {
              items {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `
  })

  const blocks = cleanAndTransformBlocks( data.nodeByUri.blocks )
  const mainMenuItems = mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems || null)
  return {
    props: {
      mainMenuItems: mainMenuItems,
      blocks,
    }
  }
}
