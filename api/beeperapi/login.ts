// package beeperapi

import './bytes';
import './fmt';
import './io';
import './net/http';
import './time';

export class RespStartLogin {
	RequestID: string; // `json:"request"`
	Type: []string // `json:"type"`
	Expires: time.Time // `json:"expires"`
}

export class ReqSendLoginEmail {
	RequestID: string; // `json:"request"`
	Email: string; // `json:"email"`
}

export class ReqSendLoginCode {
	RequestID: string; // `json:"request"`
	Code: string; // `json:"response"`
}

export class RespSendLoginCode {
	LoginToken: string; // `json:"token"`
	Whoami: RespWhoami // `json:"whoami"`
}

var ErrInvalidLoginCode = fmt.Errorf("invalid login code")

const loginAuth = "BEEPER-PRIVATE-API-PLEASE-DONT-USE"

export const StartLogin = (baseDomain: string) (resp *RespStartLogin, err error) {
	req = newRequest(baseDomain, loginAuth, http.MethodPost, "/user/login")
	req.Body = io.NopCloser(bytes.NewReader([]byte("{}")))
	err = doRequest(req, nil, &resp)
	return
}

export const SendLoginEmail = (baseDomain, request, email: string) error {
	req = newRequest(baseDomain, loginAuth, http.MethodPost, "/user/login/email")
	reqData = &ReqSendLoginEmail{
		RequestID: request,
		Email:     email,
	}
	return doRequest(req, reqData, nil)
}

export const SendLoginCode = (baseDomain, request, code: string) (resp *RespSendLoginCode, err error) {
	req = newRequest(baseDomain, loginAuth, http.MethodPost, "/user/login/response")
	reqData = &ReqSendLoginCode{
		RequestID: request,
		Code:      code,
	}
	err = doRequest(req, reqData, &resp)
	return
}
