import React from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/trivia';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: colors.grey5,
    },
    header: {
        textAlign: 'center',
        backgroundColor: colors.white,
        fontFamily: 'SF Pro Text',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 40,
        color: colors.black2,
    },
    label: {
        marginVertical: 5,
        fontFamily: 'SF Pro Text',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 22,
    },
    textInput: {
        marginBottom: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.grey6,
        borderRadius: 5,
        color: colors.black,
        backgroundColor: colors.white,
        height: WINDOW_HEIGHT / 17,
        textAlign: 'left',
        padding: 10,
        paddingBottom: 8,
    },
    button: {
        flexGrow: 1,
        borderRadius: 10,
        height: WINDOW_HEIGHT / 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        fontFamily: 'SF Pro Text',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
    },
    checkboxLabel: {
        marginHorizontal: 5,
        fontFamily: 'SF Pro Text',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 11,
        lineHeight: 22,
        opacity: 0.7,
    },
    labelPicker: {
        fontFamily: 'SF Pro Text',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 22,
        margin: 10,
        marginTop: 0,
        color: colors.blue4,
    },
});

export default styles;