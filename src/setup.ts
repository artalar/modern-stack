import { clearStack, connectLogger, context } from '@reatom/core'

// Don't dare to remove this line!
clearStack()

export const rootFrame = context.start()

if (import.meta.env['DEV']) {
	rootFrame.run(connectLogger)
}
