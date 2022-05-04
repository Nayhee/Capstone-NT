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

    //helper function to turn decimal into a percentage.
    const decimalToPercentage = (decimal) => {
        let percent = decimal * 100;
        return Math.round(percent);
    }

    const isolateUniqueDistances = (allRounds) => {
        //users Rounds passed in
        //create set of all unique distances.
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

        if(distanceSelected === 0) {
            setFilteredRounds(allUsersRounds)
        }
    }

    const scorecardCalcs = (rounds) => {
        // console.log(rounds);
        
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

    //after first blank render, fetch the users rounds
    //then calculate the totals.
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


    return (
        <>
            <div className="home__container">

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

