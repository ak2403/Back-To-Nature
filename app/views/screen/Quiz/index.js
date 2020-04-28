import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Item, Content, Picker, Form } from "native-base";
import Icon from 'react-native-vector-icons/Feather'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getQuizQuestions, resetQuiz } from '../../../action/PerformanceAction'

import Quiz from '../../component/Quiz'

const styles = StyleSheet.create({
    controlView: {
        marginBottom: 50,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    closeIcon: {
        position: 'absolute',
        top: 60,
        left: 30,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4685A',
        borderRadius: 30
    }
})

class QuizScreen extends Component {

    state = {
        options: {
            numberOfQuestions: '',
            difficultyLevel: '',
            typeOfQuestions: ''
        },
        quizStarted: false,
        listOfQuizQuestions: [],
        isAllOptionsSelected: null
    }

    onChange = (key, value) => {
        let { options } = this.state
        options[key] = value
        this.setState({
            options
        })
    }

    ProceedQuiz = () => {
        let {options} = this.state
        let isAllOptionsSelected = true;

        for (var key of Object.keys(options)) {
            if(options[key] == ''){
                isAllOptionsSelected = false
            }
        }

        if(isAllOptionsSelected){
            this.props.getQuizQuestions(options)
        }else{
            this.setState({
                isAllOptionsSelected: false
            })
        }
        
    }

    componentDidUpdate = prevProps => {
        let { isQuizStarted, list_of_quiz_questions } = this.props

        if (isQuizStarted) {
            this.setState({
                quizStarted: true,
                listOfQuizQuestions: list_of_quiz_questions
            })
            this.props.resetQuiz()
        }

        return true;
    }

    closeQuiz = () => {
        this.setState({
            quizStarted: false
        })
        this.props.navigation.navigate("Dashboard")
    }

    render() {
        let { quizStarted, options, isAllOptionsSelected } = this.state;
        let { list_of_quiz_questions } = this.props;

        if (quizStarted) {
            return <Quiz data={list_of_quiz_questions} closeQuiz={() => this.closeQuiz()} />
        }

        return <View style={{ flex: 1, padding: 50, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <View style={styles.closeIcon}>
                <Icon name="x" size={20} color="#fff" onPress={this.closeQuiz} />
            </View>

            <Text>Quiz</Text>
            <Form style={{width: '100%'}}>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        style={{ width: undefined }}
                        // placeholder="Select the number of questions"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={options.numberOfQuestions}
                        onValueChange={value => this.onChange("numberOfQuestions", value)}
                    >
                        <Picker.Item label="Select the number of questions" value="" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="15" value="15" />
                    </Picker>
                    
                </Item>
                {(isAllOptionsSelected == false && options.numberOfQuestions == '') && <Text style={{color: '#e74c3c'}}>Please select an option</Text>}
                <Item picker>
                    <Picker
                        mode="dropdown"
                        style={{ width: undefined }}
                        // placeholder="Select the difficulty"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={options.difficultyLevel}
                        onValueChange={value => this.onChange("difficultyLevel", value)}
                    >
                        <Picker.Item label="Select the difficulty" value="" />
                        <Picker.Item label="Easy" value="easy" />
                        <Picker.Item label="Medium" value="medium" />
                        <Picker.Item label="Hard" value="hard" />
                    </Picker>
                </Item>
                {(isAllOptionsSelected == false && options.difficultyLevel == '') && <Text style={{color: '#e74c3c'}}>Please select an option</Text>}
                <Item picker>
                    <Picker
                        mode="dropdown"
                        style={{ width: undefined }}
                        // placeholder="Select the Question Type"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={options.typeOfQuestions}
                        onValueChange={value => this.onChange("typeOfQuestions", value)}
                    >
                        <Picker.Item label="Select the Question Type" value="" />
                        <Picker.Item label="Multiple Options" value="multiple" />
                        <Picker.Item label="True/False" value="boolean" />
                    </Picker>
                </Item>
                {(isAllOptionsSelected == false && options.typeOfQuestions == '') && <Text style={{color: '#e74c3c'}}>Please select an option</Text>}
            </Form>
            <Button title="Start Quiz" onPress={() => this.ProceedQuiz()} />
        </View>
    }
}

const mapStateToProps = props => {
    let { performance } = props
    return {
        list_of_quiz_questions: performance.list_of_quiz_questions,
        isQuizStarted: performance.isQuizStarted
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getQuizQuestions,
    resetQuiz
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)