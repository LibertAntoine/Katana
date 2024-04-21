import type { Transformer } from '@/src/utils/transformers'

export const transformImport: Transformer = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue()

    // Replace @/registry/[style] with the components alias.
    if (moduleSpecifier.startsWith('@/registry/')) {
      if (config.aliases.ui) {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(/^@\/registry\/[^/]+\/ui/, config.aliases.ui)
        )
      } else {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(/^@\/registry\/[^/]+/, config.aliases.components)
        )
      }
    }

    // Replace `import { cn } from "@/utils"`
    if (moduleSpecifier === '@/utils') {
      const namedImports = importDeclaration.getNamedImports()
      const cnImport = namedImports.find((i) => i.getName() === 'cn')
      if (cnImport) {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(/^@\/utils/, config.aliases.utils)
        )
      }
    }
  }

  return sourceFile
}
