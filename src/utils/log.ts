import * as fs from 'fs'
import * as moment from 'moment'

const divider =
  '\n###################################################################################################\n\n'

const write = (input: string) => fs.appendFileSync('update.log', input)

const handleMessage = (
  level: 'INFO' | 'ERROR' | 'DEBUG',
  ...input: Array<string>
) => {
  const message = `${level}\t${moment().format(
    'DD/MM/yyyy HH:mm:ss.SSS',
  )} - ${input.join(' ')} \n`
  console.log(message)
  write(message)
}

const Log = {
  info: (...input: Array<string>) => handleMessage('INFO', ...input),
  error: (...input: Array<string>) => handleMessage('ERROR', ...input),
  debug: (...input: Array<string>) => handleMessage('DEBUG', ...input),
  divider: () => write(divider),
}

export default Log
