-- FootballData SDK error

local FootballDataError = {}
FootballDataError.__index = FootballDataError


function FootballDataError.new(code, msg, ctx)
  local self = setmetatable({}, FootballDataError)
  self.is_sdk_error = true
  self.sdk = "FootballData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FootballDataError:error()
  return self.msg
end


function FootballDataError:__tostring()
  return self.msg
end


return FootballDataError
