import { join } from "path";
import { promises } from "fs";
import { transformAsync } from "@babel/core";

(async function (): Promise<void> {
  const pathToModule = join(`node_modules`, `superfine`, `index.js`);

  console.log(`Reading Superfine...`);
  const unpatchedModule = await promises.readFile(pathToModule, `utf8`);

  if (unpatchedModule.includes(`export`)) {
    console.log(`Appears to be a module; patching...`);
    const patchedModule = await transformAsync(unpatchedModule, {
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    });

    if (patchedModule?.code) {
      const pathToPackage = join(`node_modules`, `superfine`, `package.json`);

      console.log(`Reading package...`);
      const unpatchedPackage = await promises.readFile(pathToPackage, `utf8`);

      const patchedPackage = unpatchedPackage.replace(
        /^\s*"type"\s*:\s*"module"\s*,?\s*\r?\n/gm,
        ``
      );

      console.log(`Writing back package...`);
      await promises.writeFile(pathToPackage, patchedPackage);

      await console.log(`Writing back module...`);
      await promises.writeFile(pathToModule, patchedModule?.code);
    } else {
      throw `Patching appears to have failed.`;
    }
  } else {
    console.log(`Appears to have already been patched.`);
  }
})().then(
  () => {
    console.log("Successfully patched Superfine.");
    process.exit(0);
  },
  (reason) => {
    console.log(`Failed to patch Superfine: ${reason}`);
    process.exit(1);
  }
);
