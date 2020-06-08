/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const buttonIcon = (props) => {
    const useTag = `<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#${props.name}" />`;
    let className = 'slds-button__icon';
    if (props.stateful) {
        className += '--stateful';
    }
    if (props.inverse) {
        className += ' slds-button__icon--inverse';
    }
    if (props.position) {
        className = `${className} slds-button__icon--${props.position}`;
    }
    if (props.size) {
        className = `${className} slds-button__icon--${props.size}`;
    }
    if (props.hint) {
        className += ' slds-button__icon--hint';
    }
    return (
        <svg
            aria-hidden="true"
            className={className}
            dangerouslySetInnerHTML={{ __html: useTag }}
        />
    );
};

const icon = (
    props = {
        category: 'standard'
    }
) => {
    const useTag = `<use xlink:href="/assets/icons/${props.category}-sprite/svg/symbols.svg#${props.name}" />`;
    let className = 'slds-icon';
    const theme = props.theme === undefined ? props.name : props.theme;
    if (props.stateful) {
        className += '--stateful';
    }
    if (props.inverse) {
        className += ' slds-icon--inverse';
    }
    if (props.size) {
        className = `${className} slds-icon--${props.size}`;
    }
    if (props.position) {
        className = `${className} slds-icon--${props.position}`;
    }
    if (theme) {
        className = `${className} slds-icon-${props.category}-${theme}`;
    }

    return (
        <svg
            aria-hidden="true"
            className={className}
            dangerouslySetInnerHTML={{ __html: useTag }}
        />
    );
};

const inputIcon = (props) => {
    const useTag = `<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#${props.name}" />`;
    const className = 'slds-input__icon slds-icon-text-default';
    return (
        <svg
            aria-hidden="true"
            className={className}
            dangerouslySetInnerHTML={{ __html: useTag }}
        />
    );
};

buttonIcon.propTypes = {
    name: PropTypes.string.isRequired,
    stateful: PropTypes.bool.isRequired,
    inverse: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    hint: PropTypes.bool.isRequired
};

icon.propTypes = {
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    stateful: PropTypes.bool.isRequired,
    inverse: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired
};

inputIcon.propTypes = {
    name: PropTypes.string.isRequired
};

export const Icon = icon;
export const InputIcon = inputIcon;
export const ButtonIcon = buttonIcon;
