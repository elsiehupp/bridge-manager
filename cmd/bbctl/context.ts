// package main

import './github.com/urfave/cli/v2';
import './maunium.net/go/mautrix';

import './github.com/beeper/bridge-manager/api/hungryapi';

type contextKey int

const (
	contextKeyConfig contextKey = iota
	contextKeyEnvConfig
	contextKeyMatrixClient
	contextKeyHungryClient
)

export const GetConfig = (ctx: cli.Context) *Config {
	return ctx.Context.Value(contextKeyConfig).(*Config)
}

export const GetEnvConfig = (ctx: cli.Context) *EnvConfig {
	return ctx.Context.Value(contextKeyEnvConfig).(*EnvConfig)
}

export const GetMatrixClient = (ctx: cli.Context) *mautrix.Client {
	val = ctx.Context.Value(contextKeyMatrixClient)
	if val == nil {
		return nil
	}
	return val.(*mautrix.Client)
}

export const GetHungryClient = (ctx: cli.Context) *hungryapi.Client {
	val = ctx.Context.Value(contextKeyHungryClient)
	if val == nil {
		return nil
	}
	return val.(*hungryapi.Client)
}
