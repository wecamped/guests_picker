import React, { useState,useEffect } from "react";
import createMomentsSDK from "@livechat/moments-sdk";

const UserSelect = () => {
  const [momentsSDK, setmomentsSDK] = useState(null);
  const [state, setState] = useState({
    adult: {
      title: "Adults",
      subTitle: "Ages  13 or above",
      count: 1,
      name: "adult",
    },
    children: {
      title: "Children",
      subTitle: "Ages 2–12",
      count: 0,
      name: "children",
    },
    infants: {
      title: "Infants",
      subTitle: "Under 2",
      count: 0,
      name: "infants",
    },
    pets: {
      title: "Pets",
      subTitle: "Bringing a service animal?",
      count: 0,
      name: "pets",
    },
  });

  useEffect(()=>{
    createMomentsSDK({
      title: "My App",
      icon: "icon url",
      isFragile: true,
    }).then((mSdK) => {
      setmomentsSDK(mSdK)
    });
  },[])

  // get and send data
  const getDatePick = () => {
   // let val = JSON.stringify(state);

    // to parse 
    //let val0 = JSON.parse(val);
    console.log(state)
    let x=`Adults ${state.adult.count}, Children ${state.children.count}, infants ${state.infants.count}, Pets ${state.pets.count} `
    console.log(x)
    // createMomentsSDK({
    //   title: "My App",
    //   icon: "icon url",
    //   isFragile: true,
    // }).then((momentsSDK) => {
      // console.log(momentsSDK)
      if(momentsSDK){
      momentsSDK.sendMessage({ text: x });
      momentsSDK.close();
      }

   
  };
  return (
    <section>
      <div className="cs_container text_center">
        <div className="cs_date_picker_card">
          <div className="age_wrapper">
            {/*  */}
            {Object.values(state).map((item, index) => (
              <div key={index} className="age_box cs_row">
                <div className="left_">
                  <p>{item?.title}</p>
                  <span>{item?.subTitle}</span>
                </div>
                <div className="right_">
                  <span
                    onClick={() =>
                      setState({
                        ...state,
                        [item.name]: {
                          ...item,
                          count: item.count - 1 > 0 ? item.count - 1 : 0,
                        },
                      })
                    }
                    className="cs_btn"
                    role="button"
                  >
                    -
                  </span>
                  <span className="input_num">{item?.count}</span>
                  <span
                    onClick={() =>
                      setState({
                        ...state,
                        [item.name]: { ...item, count: item.count + 1 },
                      })
                    }
                    className="cs_btn"
                    role="button"
                  >
                    +
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="cs_row justify_content_end">
            <button className="cs_btn_main" onClick={getDatePick}>
              Finish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSelect;
