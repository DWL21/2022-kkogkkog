import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';

import Icon from '@/@components/@shared/Icon';
import useMe from '@/@hooks/user/useMe';
import { PATH } from '@/Router';
import theme from '@/styles/theme';

import * as Styled from './style';

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header = (props: HeaderProps) => {
  const { title = '', className } = props;

  const isLandingPage = useLocation().pathname === PATH.LANDING;

  return (
    <Styled.Root className={className}>
      <Styled.Logo>
        {isLandingPage ? (
          <Link to={PATH.LANDING}>
            <img src='/assets/images/logo.png' alt='로고' width='36' />
          </Link>
        ) : (
          <Link to='..'>
            <Icon iconName='arrow' color={theme.colors.primary_400} />
          </Link>
        )}
      </Styled.Logo>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Profile>
        <Link to={PATH.PROFILE}>
          <Icon iconName='profile' size='36' color={theme.colors.primary_400} />
        </Link>
      </Styled.Profile>
    </Styled.Root>
  );
};

export default Header;
