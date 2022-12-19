import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import axios from "axios"

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [dark, setDark] = useState(false)
  const [enTweets, setEnTweets] = useState([])
  const [showTranslated, setShowTranslated] = useState(false);

  // Fetches Tweets and stores it in State as an Array
  useEffect(() => {
    const data = []
    const getTweets = async () => {
      const res = await axios.get("https://api.twitter.com/2/users/108543358/tweets", {
        headers: {
          Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAADJ0kAEAAAAAogpT2CnVuT1qPKaTpz7y1C1T0Xo%3DNcVNoCwmBGnxdA8RWfP9nTgnTTGWB94llN8gFebL0p8rD68tSh"
        }
      })

      res.data.data.forEach((tweet) => {
        tweet.text.length < 30 ? console.log(tweet.text) : data.push(tweet.text)
      })

      setTweets(data.slice(0, 6))
    }
    getTweets()
  }, [])

  // Makes New Array with Translated Tweets and Toggles State
  const translateTweet = () => {
    const res = []
    if (showTranslated == false) {
      tweets.forEach((tweet) => {
        axios.post("https://translationapi.onrender.com/translate", {
          text: tweet
        }).then(data => {
          res.push(data.data.translation)
        }).catch(err => console.log(err))
      })
      setEnTweets(res)
    }
    setShowTranslated(!showTranslated)
  }

  // Returns Correct State Based on Translated Boolean State
  const returnArray = () => {
    if (showTranslated) {
      return enTweets
    } else {
      return tweets
    }
  }

  return (
    <View style={dark ? styles.dark : styles.container}>
      <StatusBar style={dark ? "light" : "dark"} />

      <ScrollView style={{ marginTop: 100 }}>
        <Text style={dark ? styles.darkTitle : styles.title}>Latest Tweets from BMKG!</Text>
        {returnArray().map((tweet, idx) => {
          return (
            <View>
              <Text style={dark ? styles.darkTweet : styles.tweet} key={idx}>{tweet}</Text>
            </View>
          )
        })}
      </ScrollView>
      <View style={{ marginBottom: 40, marginTop: 40, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={{ marginHorizontal: 10, backgroundColor: 'red', paddingVertical: 10, borderRadius: 50, paddingHorizontal: 15 }}><Button title='Status' color={'black'} ></Button></View>
        <View style={{ marginHorizontal: 10, backgroundColor: 'red', paddingVertical: 10, borderRadius: 50, paddingHorizontal: 15 }}><Button title={dark ? 'Light Mode' : 'Dark Mode'} color={'black'} onPress={() => setDark(!dark)}></Button></View>
        <View style={{ marginHorizontal: 10, backgroundColor: 'red', paddingVertical: 10, borderRadius: 50, paddingHorizontal: 15 }}><Button title="Translate" color={'black'} onPress={() => translateTweet()}></Button></View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dark: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20, fontWeight: 'bold', textAlign: 'center'
  },
  darkTitle: {
    fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white'
  },
  tweet: {
    marginHorizontal: 30, marginVertical: 10, borderWidth: 1, borderColor: 'blue', padding: 10, fontStyle: 'italic', fontWeight: '200', borderRadius: 10
  },
  darkTweet: {
    marginHorizontal: 30, marginVertical: 10, borderWidth: 1, borderColor: 'blue', padding: 10, fontStyle: 'italic', fontWeight: '200', borderRadius: 10, color: 'white'
  }
});

// API KEY: AIzaSyAZPGjIGyUlBPq16gudtL7XS_zUAZlI3o4