import { TFeaturedPost } from "./pages/HomePage/components/HeroSection/HeroSection";

export const FEATURED_POST: TFeaturedPost[] = [
    {
        imageUrl: require("./assets/images/hero-bg-1.png"),
        name: "Antisocial Ape Club",
        description: "A collection of 3333 unique, randomly generated pixel art NFTs stored on the NEAR blockchain.",
        link: "/collection/asac.near/Antisocial Ape Club"
    },
    {
        imageUrl: require("./assets/images/hero-bg-2.png"),
        name: "Nearton",
        description: "3,000 houses of the first meta town on NEAR",
        link: "/collection/nearton_nft.near/NEARton"
    },
    {
        imageUrl: require("./assets/images/hero-bg-3.png"),
        name: "Secret Skellies Society",
        description: "A Secret Society of 777 Skellies evading Grimm on the $NEAR blockchain. The first deflationary NFT on NEAR Blockchain. Come and join the society.",
        link: "/collection/secretskelliessociety.near/Secret Skellies Society"
    },
]

export const CONTRACT_ACCOUNT_ID = "galacticwaymp.near"