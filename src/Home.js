import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import {getAUsersRounds} from "../src/modules/RoundManager"


export const Home = () => {
    
    //need usersId to fetch their rounds, and need their first name to display on Scorecard. 
    const currentUser= JSON.parse(sessionStorage.getItem('putt_user'));
    const currentUsersName = currentUser.firstName;
    const currentUsersId = currentUser.id;

    //set Initial blank state's of 4 pieces of the Scorecard. 
    const [totalRoundsCount, setTotalRoundsCount] = useState();
    const [totalPutts, setTotalPutts] = useState();
    const [puttsMade, setPuttsMade] = useState();
    const [puttPercentage, setPuttPercentage] = useState();

    const [distances, setDistances] = useState([]);
    const [selectedDistance, setSelectedDistance] = useState(0);
    const [filteredRounds, setFilteredRounds] = useState([]);
    const [allUsersRounds, setAllUsersRounds] = useState([]);

    const [circle, setCircle] = useState({})


    //helper function to turn decimal into a percentage.
    const decimalToPercentage = (decimal) => {
        let percent = decimal * 100;
        return Math.round(percent);
    }

    const isolateUniqueDistances = (allRounds) => {
        let setOfDistances = new Set()
        allRounds.forEach(round => setOfDistances.add(round.distance));
        //convert set Object to an Array. 
        let distancesArray = []
        for(const dist of setOfDistances) {
            distancesArray.push(dist)
        }
        return distancesArray;        
    }

    const handleFilterChange = (event) => {
        let distanceSelected = parseInt(event.target.value);
        setSelectedDistance(distanceSelected);
        setFilteredRounds(allUsersRounds.filter(round => round.distance === distanceSelected));

        //if they picked ALL, setFilteredRounds with ALL of the users rounds.
        if(distanceSelected === 0) {
            setFilteredRounds(allUsersRounds)
        }
    }

    const scorecardCalcs = (rounds) => {
        //# of total rounds is number of objects in the fetched "AllRounds" array. Set state.  
        let roundCount = rounds.length;
        setTotalRoundsCount(roundCount);

        //set puttCount to 0, then for each round, add that round's number of putts to the count and SET state. 
        let puttCount = 0;
        rounds.forEach(r => puttCount += r.putts)
        setTotalPutts(puttCount);

        //set madeCount to 0, then for each round, add that round's number of made putts to the count and SET State. 
        let madeCount = 0;
        rounds.forEach(r => madeCount += r.made)
        setPuttsMade(madeCount);

        let decimal = madeCount / puttCount;
        //New Users have no rounds, which returns NaN, SO, I solve by initally placing a userfriendly placeholder on the DOM.  
        let percentage = decimalToPercentage(decimal)
        if(isNaN(percentage)) {
            setPuttPercentage("-")
        } else {
            setPuttPercentage(`${percentage}%`)
        }
    }

    const populateScorecard = () => {
        scorecardCalcs(allUsersRounds)
    }


    useEffect(() => {
        getAUsersRounds(currentUsersId)
        .then(allRounds => {

            setAllUsersRounds(allRounds);
            setFilteredRounds(allRounds)

            let distancesToSet = isolateUniqueDistances(allRounds);
            setDistances(distancesToSet);
        })
        .then(() => populateScorecard())
    }, [])

    useEffect(() => {
        populateScorecard();
    }, [selectedDistance])

    useEffect(() => {
        populateScorecard();
    }, [allUsersRounds])

    useEffect(() => {
        scorecardCalcs(filteredRounds)
    }, [filteredRounds])

    useEffect(() => {
        circleCalcs();
    }, [allUsersRounds])



    const circleCalcs = () => {

        let circleOne = []
        let circleTwo = []
        let circleThree = []
    
        allUsersRounds.forEach(round => {
            
            if(round.distance < 34 && round.distance > 0) {
                circleOne.push(round);
            
            }
            if(round.distance > 33 && round.distance < 67) {
                circleTwo.push(round);
            }
            if(round.distance > 66) {
                circleThree.push(round);
            }
        })


        let c1Putts = 0;
        let c1Made = 0;
        let c2Putts = 0;
        let c2Made = 0;
        let c3Putts = 0;
        let c3Made = 0;
    
        circleOne.forEach(round => {
            c1Putts += round.putts;
            c1Made += round.made;
        })
        const c1percent = c1Made / c1Putts;
    
        circleTwo.forEach(round => {
            c2Putts += round.putts;
            c2Made += round.made;
        })
        const c2percent = c2Made / c2Putts;
    
        circleThree.forEach(round => {
            c3Putts += round.putts;
            c3Made += round.made;
        })
        const c3percent = c3Made / c3Putts;
    
        let c1percentage = decimalToPercentage(c1percent)
        let c2percentage = decimalToPercentage(c2percent)
        let c3percentage = decimalToPercentage(c3percent)

        if(isNaN(c1percentage)) {
            c1percentage = " - ";
        } else {
            c1percentage = `${c1percentage}%`
        }
        if(isNaN(c2percentage)) {
            c2percentage = " - ";
        } else {
            c2percentage = `${c2percentage}%`
        }
        if(isNaN(c3percentage)) {
            c3percentage = " - ";
        } else {
            c3percentage = `${c3percentage}%`
        }

        const circleStatsObj = {
            c1: c1percentage,
            c2: c2percentage,
            c3: c3percentage
        }
        setCircle(circleStatsObj)
    }


    return (
        <>
            <div className="home__container">

                    <div className="circleScorecard">
                        <h4>% Made by Distance:</h4>
                        <div className="circleWrapper">
                            <div className="circleItemLabel">Distance:</div>
                            <div className="circleItemLabel">% Made:</div>
                            <div className="circleItem">1-33 ft</div>
                            <div className="circleItem">{circle.c1}</div>
                            <div className="circleItem">33-66 ft</div>
                            <div className="circleItem">{circle.c2}</div>
                            <div className="circleItem">66+ ft</div>
                            <div className="circleItem">{circle.c3}</div>
                        </div>
                    </div>
                    
                    
                    <div className="filterScorecard">
                        <label htmlFor="distance">Filter by Distance </label>
                        <select name="distance" id="distance" onChange={handleFilterChange} className="filterSelect">
                            <option value={0}>All</option>
                            {distances.map(d => (
                                <option key={d} value={d}>{d} ft</option>
                            ))}
                        </select>
                    </div>

                    <div className="userScorecard">
                        <h3>{currentUsersName}'s Scorecard</h3>
                        <div className="wrapper">
                            <div className="scorecardItem">Total Rounds</div>
                            <div className="scorecardItem">{totalRoundsCount}</div>
                            <div className="scorecardItem">Total Putts</div>
                            <div className="scorecardItem">{totalPutts}</div>
                            <div className="scorecardItem">Putts Made</div>
                            <div className="scorecardItem">{puttsMade}</div>
                            <div className="scorecardPercLabel">% Made</div>
                            <div className="scorecardPercValue">{puttPercentage}</div>
                        </div>
                    </div>

                    <div className="home__container__buttons">
                        <Link to={`/discs`}>
                            <button>My Discs</button>
                        </Link>
                        <Link to={`/rounds/create`}>
                            <button>Start Tracking</button>
                        </Link>
                        <Link to={`/rounds`}>
                            <button>My Rounds</button>
                        </Link>
                    </div>
            </div>
        </>
    )
}

