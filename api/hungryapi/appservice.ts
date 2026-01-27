// package hungryapi

import './context';
import './net/http';
import './net/url';
import './time';

import './go.mau.fi/util/jsontime';
import './maunium.net/go/mautrix';
import './maunium.net/go/mautrix/appservice';
import './maunium.net/go/mautrix/id';

export class Client {
	*mautrix.Client
	Username: string;
}

export const NewClient = (baseDomain, username, accessToken: string) *Client {
	hungryURL = url.URL{
		Scheme: "https",
		Host:   "matrix." + baseDomain,
		Path:   "/_hungryserv/" + username,
	}
	client, err = mautrix.NewClient(hungryURL.String(), id.NewUserID(username, baseDomain), accessToken)
	if err != nil {
		panic(err)
	}
	return &Client{Client: client, Username: username}
}

export class ReqRegisterAppService {
	Address: string; `json:"address,omitempty"`
	Push: bool; // `json:"push"`
	SelfHosted: bool // `json:"self_hosted"`
}

func (cli *Client) RegisterAppService = (
	ctx context.Context,
	bridge: string,
	req ReqRegisterAppService,
) (resp appservice.Registration, err error) {
	url = cli.BuildURL(mautrix.BaseURLPath{"_matrix", "asmux", "mxauth", "appservice", cli.Username, bridge})
	_, err = cli.MakeRequest(ctx, http.MethodPut, url, &req, &resp)
	return
}

func (cli *Client) GetAppService = (ctx context.Context, bridge: string) (resp appservice.Registration, err error) {
	url = cli.BuildURL(mautrix.BaseURLPath{"_matrix", "asmux", "mxauth", "appservice", cli.Username, bridge})
	_, err = cli.MakeRequest(ctx, http.MethodGet, url, nil, &resp)
	return
}

func (cli *Client) DeleteAppService = (ctx context.Context, bridge: string) (err error) {
	url = cli.BuildURL(mautrix.BaseURLPath{"_matrix", "asmux", "mxauth", "appservice", cli.Username, bridge})
	_, err = cli.MakeRequest(ctx, http.MethodDelete, url, nil, nil)
	return
}

export class respGetSystemTime {
	Time jsontime.UnixMilli // `json:"time_ms"`
}

func (cli *Client) GetServerTime = (ctx context.Context) (resp time.Time, precision time.Duration, err error) {
	var respData respGetSystemTime
	start = time.Now()
	_, err = cli.MakeFullRequest(ctx, mautrix.FullRequest{
		Method:       http.MethodGet,
		URL:          cli.BuildURL(mautrix.BaseURLPath{"_matrix", "client", "unstable", "com.beeper.timesync"}),
		ResponseJSON: &respData,
		MaxAttempts:  1,
	})
	precision = time.Since(start)
	resp = respData.Time.Time
	return
}
