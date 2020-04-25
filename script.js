const apiKey = "803fdd9b8517490d89d8c85ade466b8d";
      
      function processFilter(filter, fromDate){
      
      const urlAPI = `http://newsapi.org/v2/everything?q=${filter}&from=${fromDate}&sortBy=publishedAt&apiKey=${apiKey}`;

      fetch(urlAPI)
        .then((response) => response.json())
        .then((json) => {
          var articles = json.articles
          // Si no encuentra nada
          if(typeof articles === "undefined" || articles.length === 0){
            var print = "<tr><td colspan='4'><h2 class='text-center text-danger'>Nothing to show</h2></td></tr>";
            $("#articles").append(print);
            $('#total').html(0);
          }else{
            $('#total').html(articles.length);
            for (let i = 0; i < articles.length; i++) {
              // Validar datos faltantes
              if (articles[i].author == null || articles[i].author === "") {
                articles[i].author = "Unknown author";
              }

              if (articles[i].title == null || articles[i].title === "") {
                articles[i].title = "Unknown title";
              }

              var publishedAt;
              if (articles[i].publishedAt == null || articles[i].publishedAt === "") {
                articles[i].publishedAt = "Unknown publishedAt";
              } else {
                publishedAt = new Date(articles[i].publishedAt);
              }

              if (articles[i].url == null || articles[i].url === "") {
                articles[i].url = "Unknown url";
              }
              //Lenar los datos del articulo y agregarlo
              print = `<tr>
                <td>${articles[i].author}</td>
                <td>${articles[i].title}</td>
                <td>${publishedAt.getFullYear()}-${publishedAt.getMonth()}-${publishedAt.getDay()}</td>
                <td>${articles[i].url}</td>
              </tr>`;
              $("#articles").append(print);
             }
          }
          
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
      }
    
      processFilter();
      
      function sendFilter(){

        $("#articles").children().remove();


        let myFilter = $('#filter').val();
        let fromDate = $('#datepicker').val();
        processFilter(myFilter,fromDate);
      }
      //Date picker
      $('#datepicker').datepicker({
          uiLibrary: 'bootstrap4',
          format: 'yyyy-mm-dd'
      });