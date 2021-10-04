import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Button, ButtonTypeProps} from "./Button";
import {action} from "@storybook/addon-actions";



export default {
    component: Button,
    title: 'Components/Button',
} as Meta;

const Template: Story<ButtonTypeProps> = (args) => <Button {...args} />;

export const ButtonBasic = Template.bind({});

const callback = action('event submit was happened')
ButtonBasic.args = {
    title: 'submit',
    callback: callback
};