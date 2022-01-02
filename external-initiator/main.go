package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

//This will hold the transaction result
type TxResult map[string]interface{}

func main() {

	//Construct the ws url
	u := url.URL{
		Scheme: "ws",
		Host:   "localhost:26657",
		Path:   "/websocket",
	}

	WS := WebSocket{
		Endpoint: u.String(),
	}

	c := WS.Connect()

	//Subscription message
	message := `{
		"jsonrpc": "2.0",
		"method": "subscribe",
		"id": 0,
		"params": {
			"query":"tm.event = 'Tx'"
		}
	}`

	c.Subscribe(message)
}

type Payload struct {
	Endpoint  string `json:"endpoint"`
	Requester string `json:"requester"`
	Data      string `json:"data"`
}

//Start job starts triggers the job on the oracle node
func startJob(requester string) {
	fmt.Println("hereee 2: ")
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading env.")
	}

	u := url.URL{
		Scheme: "http",
		Host:   os.Getenv("EI_CHAINLINKURL"),
		Path:   fmt.Sprintf("v2/specs/%s/runs", os.Getenv("JOB_ID")),
	}

	cl := Node{
		AccessKey:    os.Getenv("EI_IC_ACCESSKEY"),
		AccessSecret: os.Getenv("EI_IC_SECRET"),
		Endpoint:     u,
	}

	p := Payload{
		Endpoint:  "statistics",
		Requester: fmt.Sprint(strings.TrimSpace(requester)),
		Data:      "{\"agg_x\": \"agg_max\", \"dataset_code\":\"COPERNICUS/S2_SR\", \"selected_band\":\"NDVI\", \"image_scale\":250.0, \"start_date\":\"2021-09-01\", \"end_date\":\"2021-09-10\", \"geometry\":{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[19.51171875,4.214943141390651],[18.28125,-4.740675384778361],[26.894531249999996,-4.565473550710278],[27.24609375,1.2303741774326145],[19.51171875,4.214943141390651]]]}}]}}",
	}

	fmt.Println("PAYLOAD: ", p)
	res, _ := json.Marshal(p)

	error := cl.Trigger(os.Getenv("JOB_ID"), res)

	if error != nil {
		log.Fatal("Error running job: ", error)
	}
	fmt.Println("Job successfully run!")
}
