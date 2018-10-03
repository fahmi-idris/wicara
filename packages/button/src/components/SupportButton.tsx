import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import { Circle } from '@kata-kit/loading';
import ThemedComponent, { variables } from '@kata-kit/theme';

import ButtonBase from '../styles';
import themes from '../theme';

export interface SupportButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  size?: 'lg' | 'sm' | '';
  isIcon?: boolean;
  className?: string;
  onClick?: any;
  block?: boolean;
  active?: boolean;
  outline?: boolean;
  loading?: boolean;
  children?: any;
}

class Button extends React.Component<SupportButtonProps> {
  static defaultProps = {
    block: false,
    active: false,
    disabled: false,
    outline: false
  };

  constructor(props: SupportButtonProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e: React.SyntheticEvent) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      className,
      size,
      block,
      active,
      disabled,
      isIcon,
      outline,
      loading,
      ...props
    } = this.props;

    const classes = classNames(
      size ? `btn-${size}` : false,
      block ? `btn-block` : false,
      {
        active,
        icon: isIcon
      },
      className
    );

    return (
      <ThemedComponent themes={themes.button}>
        {themeAttributes => (
          <SupportButtonWrapper
            type="button"
            className={classes}
            onClick={this.onClick}
            disabled={disabled}
            loading={loading}
            {...props}
            {...themeAttributes}
          >
            {loading ? (
              <>
                <LoaderCircle size={30} />
                <InvisibleText>{this.props.children}</InvisibleText>
              </>
            ) : (
              this.props.children
            )}
          </SupportButtonWrapper>
        )}
      </ThemedComponent>
    );
  }
}

export default Button;

const LoaderCircle = styled(Circle)`
  position: absolute;
  left: 50%;
  margin-left: -16px;
  margin-top: -8px;
`;

const InvisibleText = styled('span')`
  visibility: hidden;
`;

const SupportButtonWrapper = styled<SupportButtonProps, 'button'>('button')`
  ${ButtonBase} padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 11px;
  line-height: 1.45;

  color: ${variables.colors.gray50};
  border: 1px solid ${variables.colors.gray30};
  background: #fff;
  position: ${props => (props.loading ? 'relative !important' : 'inherit')};

  &:hover {
    background-color: ${variables.colors.gray10};
    color: ${variables.colors.gray50};
  }

  &:focus {
    box-shadow: unset;

    color: ${variables.colors.white};
    background-color: ${variables.colors.gray70};

    ${LoaderCircle} {
      svg path,
      svg rect {
        fill: ${variables.colors.white};
      }
    }
  }

  &.icon {
    height: 32px;
    width: 32px;
    padding: 8px;
    text-align: center;
    background: none;
    color: $gray-60;

    i:before {
      font-size: 16px;
    }
  }
`;
