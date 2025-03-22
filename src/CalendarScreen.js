import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import RNPickerSelect from "react-native-picker-select";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;

// Cấu hình lịch tiếng Việt
LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ],
  monthNamesShort: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
  dayNames: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay"
};
LocaleConfig.defaultLocale = "vi";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate.toISOString().split("T")[0]);
  const [selectedDay, setSelectedDay] = useState(selectedDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleConfirm = () => {
    const newDate = new Date(Date.UTC(selectedYear, selectedMonth - 1, selectedDay));
    const formattedDate = newDate.toISOString().split("T")[0];
    setSelectedDate(newDate);
    setCurrentDate(formattedDate);
    setShowPicker(false);
  };

  const handleSwipe = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX > 50) {
      // Swipe Right - Giảm tháng
      setSelectedMonth((prev) => (prev === 1 ? 12 : prev - 1));
    } else if (translationX < -50) {
      // Swipe Left - Tăng tháng
      setSelectedMonth((prev) => (prev === 12 ? 1 : prev + 1));
    }
    translateX.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <Animated.View style={[styles.calendarWrapper, animatedStyle]}>
          <Calendar
            style={styles.calendar}
            key={currentDate}
            current={currentDate}
            onDayPress={(day) => {
              const newDate = new Date(day.dateString);
              setSelectedDate(newDate);
              setCurrentDate(day.dateString);
            }}
            markedDates={{
              [currentDate]: {
                selected: true,
                selectedColor: "blue",
              },
            }}
            theme={{
              todayTextColor: "red",
              arrowColor: "black",
              monthTextColor: "black",
              textMonthFontSize: 20,
              textMonthFontWeight: "bold",
              textMonthStyle: { textTransform: "uppercase" }
            }}
          />
        </Animated.View>
      </PanGestureHandler>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.selectDateButton}>
        <Text style={styles.selectDateText}>Chọn ngày</Text>
      </TouchableOpacity>

      <Text style={styles.selectedDate}>
        Ngày đã chọn: {format(selectedDate, "dd/MM/yyyy", { locale: vi })}
      </Text>

      <Modal visible={showPicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Chọn ngày</Text>
            <RNPickerSelect onValueChange={setSelectedDay} items={days} value={selectedDay} />
            <Text style={styles.pickerTitle}>Chọn tháng</Text>
            <RNPickerSelect onValueChange={setSelectedMonth} items={months} value={selectedMonth} />
            <Text style={styles.pickerTitle}>Chọn năm</Text>
            <RNPickerSelect onValueChange={setSelectedYear} items={years} value={selectedYear} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.button}>
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm} style={styles.button}>
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  calendarWrapper: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  calendar: {
    width: 350,
    height: 350,
    alignSelf: "center",
  },
  selectDateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  selectDateText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
  },
});

