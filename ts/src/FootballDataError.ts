
import { Context } from './Context'


class FootballDataError extends Error {

  isFootballDataError = true

  sdk = 'FootballData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FootballDataError
}

