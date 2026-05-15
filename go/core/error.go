package core

type FootballDataError struct {
	IsFootballDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFootballDataError(code string, msg string, ctx *Context) *FootballDataError {
	return &FootballDataError{
		IsFootballDataError: true,
		Sdk:              "FootballData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FootballDataError) Error() string {
	return e.Msg
}
