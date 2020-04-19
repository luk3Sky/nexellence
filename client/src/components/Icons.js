import React from 'react';

const buttonIcon = (props) => {
    const useTag = '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#' + props.name + '" />';
    const className  = "slds-button__icon";
    if (props.stateful) {
        className += "--stateful";
    }
    if (props.inverse) {
        className = className + " slds-button__icon--inverse";
    }
    if (props.position) {
        className = className + " slds-button__icon--" + props.position;
    }
    if (props.size) {
        className = className + " slds-button__icon--" + props.size;
    }
    if (props.hint) {
        className = className + " slds-button__icon--hint";
    }
    return (
        <svg aria-hidden="true" className={className} dangerouslySetInnerHTML={{__html: useTag }} />
    );
}

const icon = (props) => {
    const getDefaultProps = () => {
        return {
            category: "standard"
        }
    }

    const useTag = '<use xlink:href="/assets/icons/' + props.category + '-sprite/svg/symbols.svg#' + props.name + '" />';
    const className  = "slds-icon";
    const theme = props.theme === undefined ? props.name : props.theme;
    if (props.stateful) {
        className += "--stateful";
    }
    if (props.inverse) {
        className = className + " slds-icon--inverse";
    }
    if (props.size) {
        className = className + " slds-icon--" + props.size;
    }
    if (props.position) {
        className = className + " slds-icon--" + props.position;
    }
    if (theme) {
        className = className + " slds-icon-" + props.category + "-" + theme;
    }

    return (
        <svg aria-hidden="true" className={className} dangerouslySetInnerHTML={{__html: useTag }} />
    );
}

const inputIcon = (props) => {
    const useTag = '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#' + props.name + '" />';
    const className  = "slds-input__icon slds-icon-text-default";
    return (
        <svg aria-hidden="true" className={className} dangerouslySetInnerHTML={{__html: useTag }} />
    );
}

export const Icon = icon;
export const InputIcon = inputIcon;
export const ButtonIcon = buttonIcon;