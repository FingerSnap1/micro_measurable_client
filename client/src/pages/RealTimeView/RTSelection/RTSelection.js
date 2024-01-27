import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./RTSelection.css";
import { FaCalendarAlt } from "react-icons/fa";
import CurrentDate from "../../../components/CurrentDate";
import CustomDropDown from "../../../components/CustomDropDown/CustomDropDown";

import { useRTDataMutation } from '../../../hooks/useRTDataMutation';

import { 
  selectLocationOptions,
  selectUnitOptions,
  selectHourOptions,
} from "../../../constants/selectOption";

function RTSelection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(selectHourOptions[0]);
  const [selectedLocation, setSelectedLocation] = useState(
    selectLocationOptions[0]
  );
  const [selectedUnit, setSelectedUnit] = useState(selectUnitOptions[0]);

  const handleNodeSelect = (node) => {
    setSelectedLocation(node);
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    console.log("🚀 ~ handleUnitSelect ~ unit:", unit);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  const CustomDatePickerIcon = React.forwardRef(({ onClick }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      style={{ background: "none", border: "none" }}
    >
      <FaCalendarAlt style={{ color: "rgba(85,183,107)", fontSize: "1.2em" }} />
    </button>
  ));

  // 시간 배열 생성
  useEffect(() => {
    const now = new Date();
    const nearestHour = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      0,
      0,
      0
    );
    setSelectedDate(nearestHour);
  }, []);

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     // event.preventDefault()
      
  //     return fetchRTTableData(selectedLocation,selectedDate,selectedUnit,selectedHour,);
  //   },
  // })

  const { mutate, isLoading } = useRTDataMutation();

  const handleSearchButton = () => {
    mutate({ selectedLocation, selectedDate, selectedUnit, selectedHour });
  };

  return (
    <div className="RTTable">
      {/* table container section */}
      <div className="RT-table-select-container">
        <div>
          <div className="location-and-unit">
            <div className="RT-table-location">
              <p style={{ fontWeight: "bold", marginRight: "10px" }}>
                측정위치
              </p>
              <CustomDropDown
                optionData={selectLocationOptions}
                selectedValue={selectedLocation}
                handleSelectedValue={handleNodeSelect}
              />
            </div>
            <div className="RT-table-unit">
              <p style={{ fontWeight: "bold", marginRight: "10px" }}>
                측정단위
              </p>
              <CustomDropDown
                optionData={selectUnitOptions}
                selectedValue={selectedUnit}
                handleSelectedValue={handleUnitSelect}
              />
            </div>
            <div className="RT-table-time">
              <p style={{ fontWeight: "bold", marginRight: "10px" }}>
                측정일시
              </p>
              <div className="time-dropdown" style={{ marginRight: "10px" }}>
                {selectedDate && (
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    {selectedDate.toLocaleDateString()}
                  </div>
                )}
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showTimeSelect={false}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  customInput={<CustomDatePickerIcon />}
                />
              </div>
              {selectedUnit == "시간평균" ? (
                <CustomDropDown
                  optionData={selectHourOptions}
                  selectedValue={selectedHour}
                  handleSelectedValue={handleHourSelect}
                />
              ) : null}
            </div>
          </div>

          <div className="search-btn-container">
            <button className="search-btn" onClick={handleSearchButton }> 검색 </button>
          </div>
          
        </div>
      </div>
      <div className="RT-table-title-container">
        <span className="RT-table-title">| 측정 일시 |</span> <CurrentDate />
      </div>
    </div>
  );
}

export default RTSelection;
