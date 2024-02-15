import * as fs from 'fs'
import * as moment from 'moment'

const divider =
  '\n###################################################################################################\n\n'

const LogLevels = {
  INFO: 0,
  ERROR: 0,
  DEBUG: 2,
  TRACE: 3,
}

const write = (input: string) =>
  fs.appendFileSync('/home/salvocolonna/dynu/update.log', input)

const handleMessage = (
  level: 'INFO' | 'ERROR' | 'DEBUG',
  ...input: Array<string | undefined>
) => {
  if (LogLevels[level] <= LogLevels[process.env.LOG_LEVEL ?? 'INFO']) {
    const message = `${level}\t${moment().format(
      'DD/MM/yyyy HH:mm:ss.SSS',
    )} - ${input.join(' ')} \n`
    write(message)
  }
}

const Log = {
  info: (...input: Array<string | undefined>) =>
    handleMessage('INFO', ...input),
  error: (...input: Array<string | undefined>) =>
    handleMessage('ERROR', ...input),
  debug: (...input: Array<string | undefined>) =>
    handleMessage('DEBUG', ...input),
  divider: () => write(divider),
}

export default Log
