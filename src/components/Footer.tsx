import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.footer`
	width: 100vw;
	height: 50px;
	text-align: center;
	line-height: 50px;
	background: blue;
	color: white;
`;

const Footer = () => {
	return <FooterWrap>Footer</FooterWrap>;
};

export default Footer;
