using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using ASP_NET_Core.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace ASP_NET_Core.Controllers;

[Route("api/[controller]/[action]")]
public class SampleDataController: Controller {

    [HttpGet]
    public object Get(DataSourceLoadOptions loadOptions) {
        return DataSourceLoader.Load(SampleData.Orders, loadOptions);
    }

    [HttpPost]
    public IActionResult Post(string values) {
        var newOrder = new SampleOrder();
        newOrder.OrderID = SampleData.Orders.Last().OrderID + 1;
        PopulateModel(newOrder, JsonSerializer.Deserialize<IDictionary>(values));
        SampleData.Orders.Add(newOrder);
        return Ok(newOrder);
    }

    [HttpPut]
    public IActionResult Put(int key, string values) {
        var order = SampleData.Orders.FirstOrDefault(e => e.OrderID == key);
        PopulateModel(order, JsonSerializer.Deserialize<IDictionary>(values));
        return Ok(order);
    }

    [HttpDelete]
    public void Delete(int key) {
        var order = SampleData.Orders.FirstOrDefault(e => e.OrderID == key);
        SampleData.Orders.Remove(order);
    }

    void PopulateModel(SampleOrder order, IDictionary values) {
        if(values.Contains("OrderID"))
            order.OrderID = Convert.ToInt32(values["OrderID"]);

        if(values.Contains("OrderDate"))
            order.OrderDate = Convert.ToDateTime(Convert.ToString(values["OrderDate"]));

        if(values.Contains("Freight"))
            order.Freight = Convert.ToDouble(Convert.ToString(values["Freight"]));

        if(values.Contains("ShipCountry"))
            order.ShipCountry = Convert.ToString(values["ShipCountry"]);

        if(values.Contains("ShipName"))
            order.ShipName = Convert.ToString(values["ShipName"]);
    }
}
