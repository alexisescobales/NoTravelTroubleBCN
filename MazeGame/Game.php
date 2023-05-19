<?php 
session_start();
// if(isset($_SESSION['usuario'])){
//     header('location: index.php');
// }
$nombreBD = "nttbcn"; //Hay que poner el nombre de la BBDD
$usuarioBD = "root"; //Hay que poner el nombre del admin de BBDD
$contraseñaBD = ""; //Hay que poner la contraseña del admin de BBDD
$conn = mysqli_connect("localhost", $usuarioBD, $contraseñaBD, $nombreBD);
if(!$conn){
    echo "No se pudo conectar con el servidor, porfavor inténtelo más tarde!";
}


if (isset($_GET["puntosfinales"])) {
    $puntuacion = $_GET["puntosfinales"];
    $usuario = $_SESSION['usuario']; 
    $idJuego = 2;
    //$usuario = "prueba";
        $verificar=$conn->query("select exists (select * from usuarios where Nombre='$usuario');");
        $row=mysqli_fetch_row($verificar);
            if ($row[0]=="1") {
                    $consulta = "select idUsuario from usuarios where Nombre='$usuario';";
                    $id = mysqli_query($conn, $consulta); 
                    $row = mysqli_fetch_assoc($id);
                    $id2 = $row['idUsuario'];
                    $verificar=$conn->query("select exists (select * from jugar where idUsuario='$id2');");
                    $row=mysqli_fetch_row($verificar);
                if ($row[0]=="1") {
                    $consulta = "UPDATE jugar SET Puntuacion='$puntuacion' where idUsuario='$id2'";
                    if (mysqli_query($conn, $consulta)) {
                        }else {
                        }
                }else{
                    $consulta = "INSERT INTO jugar (idJuego, idUsuario, Puntuacion) values ('$idJuego', '$id2', '$puntuacion')" ;
                    if (mysqli_query($conn, $consulta)) {
                        }else {
                        }
                }

            }
    } 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Maze</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.cdnfonts.com/css/big-shot" rel="stylesheet">
</head>
<body>
    

    <div id="board">
        <div id="player"></div>
        <div id="walls"></div>
    </div>
    <div id="logx"></div>
    <div id="logy"></div>
    

    <div class="scoreboard" style="display: block">
        <table class="scoreboardTable">
            <thead class="scoreboardTableHead">
                <tr class="scoreboardTableRow">
                    <tb>ESCAPE THE MAZE</tb>
                    
                    </br>
                    <tb>Time
                        </br>
                        <button id="TimeButton" onclick="timer()"> Start the game</button>
                        <button onclick="location.href='/NTTBCN/index.html'" type="button">
                            Volver a la pagina principal</button>
                        <div id="Progress">
                            <div id="bar"></div>
                        </div>
                    </tb>
                    </br>
                    <tb>Map Pieces Found
                        <div id="score"> 0/4 </div>
                    </tb>
                    <br>
                    <tb>USA LAS FLECHAS DEL TECLADO PARA MOVERSE. <br> ENCUENTRA LAS 4 PIEZAS EN UN MINUTO PARA ESCAPAR. </tb>
                </tr>
            </thead>
        </table>
    </div>


    <script src="Main.js"></script>
</body>

</html>