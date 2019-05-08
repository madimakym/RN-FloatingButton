import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'

class App extends Component {

    state = {
        animation: new Animated.Value(0)
    }

    toggleOpen = () => {
      const toValue = this._open ? 0 : 1;

      Animated.timing(this.state.animation, {
        toValue,
        duration: 200
      }).start();

      this._open = !this._open;
    }

  render() {

    const bgStyle = {
      transform: [{
        scale: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30]
        })
      }]
    }

    const reloadStyle = {
       transform:[{
         scale: this.state.animation
       }, {
         translateY:this.state.animation.interpolate({
           inputRange: [0, 1],
           outputRange: [0, -70]
         })
       }
      ] 
    }

    const orderStyle = {
      transform:[{
        scale: this.state.animation
      }, {
        translateY:this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140]
        })
      }] 
   }

   const labelPositionInterpolate = 
   this.state.animation.interpolate({
     inputRange: [0, 1],
     outputRange: [-30, -90]
   });

   const opacityInterpolate = 
   this.state.animation.interpolate({
     inputRange: [0, .8, 1],
     outputRange: [0, 0, 1]
   });

   const labelStyle = {
    opacity: opacityInterpolate,
    transform: [{
      translateX: labelPositionInterpolate
    }]
   }


    return (
        <View style={styles.MainContainer}>
          <Animated.View style={[styles.background, bgStyle]} />
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.button, styles.other, orderStyle]}>
              <Animated.Text style={[styles.label, labelStyle]}>Order</Animated.Text>
              <FontAwesome name="glass" size={20} color="#555"/>
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <Animated.View style={[styles.button, styles.other, reloadStyle]}>
              <Animated.Text style={[styles.label, labelStyle]}>Reload</Animated.Text>
              <FontAwesome name="repeat" size={20} color="#555"/>
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.toggleOpen}>
              <View style={[styles.button, styles.pay]}>
                <Animated.Text style={[styles.label, labelStyle]}>Pay</Animated.Text>
                <Text style={styles.payText}>Menu</Text>
              </View>
          </TouchableWithoutFeedback>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  background:{
    backgroundColor: "rgba(0,0,0, .5)",
    position:'absolute',
    width: 60,
    height: 60, 
    bottom: 20,
    right: 20,
    borderRadius: 30

  },


   button:{
     width: 60,
     height: 60, 
     alignItems: "center",
     justifyContent: "center",
     shadowColor: "#333",
     shadowOpacity: .1,
     shadowOffset: { x:2, y:0 },
     shadowRadius: 2,
     borderRadius: 30, 
     position: 'absolute',
     bottom: 20,
     right: 20,
   }, 

   pay:{
     backgroundColor: "#00B15E"
   },

   other:{
    backgroundColor: "#FFF",
    transform:[{
      translateY: -70
    }]
   },

   payText:{
     color: "#FFF"
   },

   label:{
    color:'#FFF',
    position:'absolute',
    fontSize: 18,
    backgroundColor: "transparent"
   }
});


export default App;
