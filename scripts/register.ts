import { ethers } from 'hardhat'
import { Cattestation__factory } from '../typechain-types'

const CATTESTATION = '0x8789B934FDbDC791B48400290ADe01b4808a5eCb'

interface Cat {
    address: string
    catadata: {
        name: string
        description: string
        image: string
    }
}

const cats: Cat[] = [
    {
        address: '0x39a1D7A8436D4cC6d3F711F26E08438A6543bF46',
        catadata: {
            name: 'KakedashiCats',
            description: 'The face of KakedashiWorld, courtesy of kakedashi',
            image: 'ipfs://',
        },
    },
]

async function main() {
    const [deployer] = await ethers.getSigners()
    const cattestation = await Cattestation__factory.connect(
        CATTESTATION,
        deployer,
    ).waitForDeployment()

    // Ready
    for (const cat of cats) {
        await cattestation.register(cat.address, cat.catadata)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
