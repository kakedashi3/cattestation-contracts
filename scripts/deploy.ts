import { ethers, run } from 'hardhat'
import { Cattestation__factory } from '../typechain-types'

const EAS_SEPO = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e'
const EAS_MEOW_SCHEMA_ID = '0x03b040aa8df5d4dccdc089d7fbe84da4be2c09df8244cc9da3566ea9f63bfd69'

async function main() {
    const [deployer] = await ethers.getSigners()
    const cattestationConstArgs = [EAS_SEPO, EAS_MEOW_SCHEMA_ID] as const
    const cattestation = await new Cattestation__factory(deployer)
        .deploy(...cattestationConstArgs)
        .then((contract) => contract.waitForDeployment())
    console.log(`Deployed: ${await cattestation.getAddress()}`)
    // Wait
    await new Promise((resolve) => setTimeout(resolve, 30_000))
    // Verify
    await run('verify:verify', {
        address: await cattestation.getAddress(),
        constructorArguments: cattestationConstArgs,
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
