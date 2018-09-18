import React, { Component } from 'react';
import './App.css';
import { ReactiveBase, CategorySearch, ResultList } from '@appbaseio/reactivesearch';


class App extends Component {
  render() {
    return (
      <ReactiveBase
				app="vozdopovo"
				credentials="4YlL7ry0S:36feb53b-d6ac-4970-94f6-cb1932b5acc0">
				<CategorySearch
						componentId="searchbox"
						dataField="text"
						placeholder="Search for tweets"
					/>
					<ResultList
						componentId="result"
						title="Results"
						dataField="text"
						from={0}
						size={10}
						pagination={true}
						react={{
							and: ["searchbox", "ratingsfilter"]
						}}
						onData={(res) => {
              const normalizedScore = Math.floor((res.score + 1) * 60);
              const normalizedMagnitude = Math.min(Math.floor(res.magnitude * 100), 100);
							return {
								image: res.picture,
								title: res.author,
								description: (
                  <div style={{backgroundColor: `hsl(${normalizedScore},${normalizedMagnitude}%,80%)`}}>${res.text}</div>
                ),
                url: `http://twitter.com/${res.author}/status/${res.id}`
							}
            }}
            innerClass={{
              image: 'image',
            }}
            style={{
                width: "100%",
                textAlign: "center",
              }
            }
					/>
			</ReactiveBase>
    );
  }
}

export default App;
