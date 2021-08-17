import React from 'react';
import styled from 'styled-components';

const MainWrap = styled.main`
	width: 100vw;
	height: calc(100vh - 100px);
	text-align: center;
	line-height: calc(100vh - 100px);
	font-weight: bold;
`;

const Main = () => {
	return <MainWrap>Main</MainWrap>;
};

export default Main;
