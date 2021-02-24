import { Component, OnInit, OnChanges, Input } from "@angular/core";

import { Friend } from "../../models/friend.model";
import { AppState } from "../../app.state";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as d3 from "d3";
@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.css"],
})
export class StatsComponent implements OnInit, OnChanges {
  @Input() friends: any[];
  constructor(private store: Store<AppState>) {}

  private svg;
  private margin = 50;
  private width = 600;
  private height = 450;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  ngOnInit(): void {
    // if (this.friends) {
    //   this.createSvg();
    //   this.createColors();
    //   this.drawChart();
    // }
  }

  ngOnChanges() {
    if (this.svg) {
      this.drawChart();
    } else {
      this.createSvg();
      this.createColors();
      this.drawChart();
    }
  }

  private createSvg(): void {
    this.svg = d3
      .select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.getDataForColors())
      .range([
        "#ef9a9a",
        "#e57373",
        "#80CBC4",
        "#4DB6AC",
        "#E0E0E0",
        "#BDBDBD",
        "#90A4AE",
        "#B0BEC5",
        "#A5D6A7",
        "#81C784",
        "#9FA8DA",
        "#7986CB",
      ]);
  }

  getDataForColors() {
    let x = [];
    this.friends.forEach((p) => {
      x.push(p["friends"]["length"].toString());
    });
    return x;
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie().value((d) => Number(d["friends"]["length"]));
    let x = [];
    this.friends.forEach((t) => {
      x.push(t);
    });
    // Build the pie chart
    this.svg
      .selectAll("pieces")
      .data(pie(x))
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr("fill", (d, i) => this.colors(i))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll("pieces")
      .data(pie(x))
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("transform", (d) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }
}
