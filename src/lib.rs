mod utils;

use std::collections::HashMap;

use wasm_bindgen::prelude::*;
use rand::Rng;
use serde_json::{Result, Value};

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Role {
    Driver,
    Conductor,
    Mechanic,
    Promoter,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum Energy {
    Fossil,
    Electric,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq)]
pub struct Position {
    latitude: f64,
    longitude: f64,
    elevation: f32,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq)]
pub struct Stop {
    stop_name: String,
    stop_location: Position,
    stop_activity: f32,       // How busy is the stop
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Crew {
    f_name: String,
    s_name: String,
    id_number: u32,
    dob: u128,
    function: Role,
    pay: u32,
    online: bool,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq)]
pub struct Trip {
    start_point: Position,
    end_point: Position,
    stops: Vec<Stop>,
    expected_amount: u32,
    expected_time: u128,
    start_time: u128,
    end_time: u128,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq)]
pub struct RouteTree {
    nodes: Vec<Stop>,
    root: Stop,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq)]
pub struct Strategy {
    optimal_stop_list: Vec<Stop>
}


#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq)]
pub struct Vehicle {
    unique_id: u32,
    registration_number: String,
    nick_name: String,
    crew_list: Vec<Crew>,
    trip_target_amount: u32,
    current_amount: u32,
    active: bool,
    active_location: Position,
    active_time: u128,
    rest_point: Position,
    fuel_level: f32,
    energy_source: Energy,
    current_trip: Trip,
    vehicle_condition: f32,
    vehicle_capacity: u32,
    current_occupancy: u32,
    last_stop: Stop,
    last_stop_alighted: u32, // The number of passengers(goods) alighted at stop
    last_stop_boarded: u32,  // The number of passengers(goods) boarded at stop 
    next_stop: Stop,         // The next immediate stop
    // ecu_state: Ecu,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq)]
pub struct TransportSpace {
    vehicles: Vec<Vehicle>,
    // routes: HashMap<Vehicle, RouteTree>,
    trips: Vec<Trip>,
    all_stops: Vec<Stop>,
}


#[wasm_bindgen]
impl TransportSpace {

    fn universe_update(&mut self, updated_vehicles: Vec<Vehicle>, updated_trips: Vec<Trip>) {
        let mut next_state = (self.vehicles.clone(), self.trips.clone());

        if updated_vehicles.is_empty() {
            self.vehicles = next_state.0.clone();
        } else if updated_trips.is_empty() {
            self.trips = next_state.1.clone();
        } else {
            let vehicles_iter = updated_vehicles.into_iter();
            let _ = vehicles_iter.map(|vehicle| next_state.0.push(vehicle));
            let trips_iter = updated_trips.into_iter();
            let _ = trips_iter.map(|trip| next_state.1.push(trip));
        }
        self.vehicles = next_state.0;
        self.trips = next_state.1;
    }

    // Optimize the trip of a vehicle given the current state of space
    fn optimize_trip(&mut self, target_vehicle_uid: u32) {

    }
}

/// public methods, exported to javascript
#[wasm_bindgen]
impl TransportSpace {
    pub fn new() -> TransportSpace{
        let genesis_vehicles: Vec<Vehicle> = Vec::new();
        let genesis_trips : Vec<Trip> = Vec::new();
        let genesis_stops: Vec<Stop> = Vec::new();

        TransportSpace { 
            vehicles: genesis_vehicles,
            trips: genesis_trips,
            all_stops: genesis_stops 
        }
    }

    /// Add a vehicle in transport space
    /// Also update the list of stops from the vehicle's stops and also add the trips
    pub fn add_vehicle(&self, vehicle: Vehicle) -> TransportSpace {
        let mut old_vehicles = self.vehicles.clone();
        old_vehicles.push(vehicle);
        
        TransportSpace { vehicles: old_vehicles, trips: self.trips, all_stops: self.all_stops }
    }

    /// Find vehicle in space and update it
    /// This should also update any new trips and stops associate with the vehicle update
    pub fn update_vehicle(&self, updated_vehicle: Vehicle) -> TransportSpace {
        let mut vehicle_list = self.vehicles;

        for vehicle in &mut vehicle_list {
            match vehicle.unique_id.eq(&updated_vehicle.unique_id) {
                true  => *vehicle = updated_vehicle,
                false => (),
            }
        }

        TransportSpace { vehicles: vehicle_list, trips: self.trips, all_stops: self.all_stops }
    }
}


#[wasm_bindgen]
impl Vehicle {
    /// Maybe we don't need to pass along the parameters, we could add them after object initialization? 
    pub fn new(vehicle_params: JsValue) -> Vehicle{

        let random_number_id = rand::thread_rng().gen_range(1000..=100000000);

        let vehicle_data = serde_json::json!(vehicle_params);

        Vehicle { 
            unique_id: random_number_id,
            registration_number: vehicle_data["reg_number"].to_string(),
            nick_name: String::with_capacity(0),
            crew_list: (),
            trip_target_amount: (),
            current_amount: (),
            active: (),
            active_location: (),
            active_time: (),
            rest_point: (),
            fuel_level: (),
            current_trip: (),
            vehicle_condition: (),
            vehicle_capacity: (),
            current_occupancy: (),
            last_stop: (),
            last_stop_alighted: (),
            last_stop_boarded: (),
            next_stop: () 
        }
    }
} 


#[wasm_bindgen]
impl Crew {
    pub fn new() -> Crew {
        let role_default = Role::Driver;

        Crew { 
            f_name: String::new(),
            s_name: String::new(),
            id_number: 0,
            dob: 0,
            function: role_default,
            pay: 0,
            online: false 
        }
    }
}


#[wasm_bindgen]
impl Stop {
    pub fn new() -> Stop {
        Stop { 
            stop_name: String::new(),
            stop_location: Position { latitude: 0.0, longitude: 0.0, elevation: 0.0 },
            stop_activity: 0.0 }
    }
}