import React from 'react';
import styled from 'styled-components';

const HeaderWrap = styled.header`
	width: 100vw;
	height: 50px;
	text-align: center;
	line-height: 50px;
	background: red;
	color: white;
`;

const Header = () => {
	return <HeaderWrap>header</HeaderWrap>;
};

export default Header;
