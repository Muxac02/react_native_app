import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native'
import Port from "../assets/RecordCardIcons/Port.svg"
import Ship from "../assets/RecordCardIcons/Ship.svg"

export default function RecordCard(props) {
    const data = props.data
    const arrive_date = new Date(data.arrive_date)
    const current_date = Date.now()
    const countDownTimer = () => {
        const diff = arrive_date - current_date;
        const days = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)))
        const hours = Math.abs(Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
        const minutes = Math.abs(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
        return (<>
            <View style={styles.contentTimeTimer}>
                <Text style={styles.contentTimeTimerText}>
                    {Math.floor(days / 10) == 0 ? "0"+days.toString():days}
                </Text>
                <Text style={styles.contentTimeTimerTextUndertime}>день</Text>
            </View>
            <View>
                <Text style={styles.contentTimeTimerText}>:</Text>
            </View>
            <View style={styles.contentTimeTimer}>
                <Text style={styles.contentTimeTimerText}>
                    {Math.floor(hours / 10) == 0 ? "0"+hours:hours}
                </Text>
                <Text style={styles.contentTimeTimerTextUndertime}>часов</Text>
            </View>
            <View>
                <Text style={styles.contentTimeTimerText}>:</Text>
            </View>
            <View style={styles.contentTimeTimer}>
                <Text style={styles.contentTimeTimerText}>
                    {Math.floor(minutes / 10) == 0 ? "0"+minutes:minutes}
                </Text>
                <Text style={styles.contentTimeTimerTextUndertime}>минут</Text>
            </View>
        </>)
    }
    return (
      <TouchableHighlight underlayColor="#6CACE4" style={styles.container} onPress={()=>{console.log(`record ${data.number} pressed`)}}>
        <View>
        <View style={styles.head}>
            <View style={styles.headShip}>
                <Ship width={32} height={32}/>
                <Text style={styles.headText}>{data.ship}</Text>
            </View>
            <View style={styles.headPort}>
                <Port width={32} height={32}/>
                <Text style={styles.headText}>{data.port}</Text>
            </View>
        </View>
        <View style={styles.content}>
            <View style={styles.contentDate}>
                <Text style={styles.contentDateText}>До прибытия в порт</Text>
                <Text style={styles.contentDateText}>{arrive_date.toLocaleString()}</Text>
            </View>
            <View style={styles.contentTime}>
                {countDownTimer()}
            </View>
        </View>
        </View>
      </TouchableHighlight>
      );
    }

const textColor = "#333333"
const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    marginTop: 8,
    marginHorizontal: 8,
    boxShadow: "0 4 6.7 0 rgba(0, 0, 0, 0.25)"
  },
  head: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: "rgba(127, 127, 127, 0.4)",
    paddingBottom: 4
  },
  headShip:{
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
  },
  headPort: {
    flexDirection: "row",
    alignItems: "center",
    width: "25%",
  },
  headText: {
    fontSize: 24,
    fontWeight: 600,
    marginLeft: 4,
    color: textColor,
    top: 2
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentDate: {
    justifyContent: 'space-between',
  },
  contentDateText: {
    color: textColor,
    fontSize: 16
  },
  contentTime: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  contentTimeTimer: {
    alignItems: 'center',
  },
  contentTimeTimerText: {
    fontSize: 32,
    color: textColor,
    lineHeight: 36
  },
  contentTimeTimerTextUndertime: {
    fontSize: 12,
    color: textColor,
    lineHeight: 12
  }
});
