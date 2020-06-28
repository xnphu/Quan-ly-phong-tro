import React from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/trivia';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'center',
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
        fontSize: 14,
        lineHeight: 22,
    },
    textInput: {
        marginBottom: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.grey4,
        borderRadius: 5,
        color: colors.black,
        backgroundColor: colors.grey6,
        height: WINDOW_HEIGHT / 17,
        textAlign: 'left',
        padding: 10,
        paddingBottom: 8,
    },
    button: {
        flexGrow: 1,
        borderRadius: 5,
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
        color: colors.white,
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
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});

export default styles;