if [ -d $1 ] 
then
    echo "Directory $1 exists, so we do not install there!" 
else
    cd /home/tina/Documents/projects/bank-statement-analysis/front-end
    npm run build

    cd /home/tina/Documents/projects/bank-statement-analysis/back-end
    npm run build


    mkdir $1
    cp -a /home/tina/Documents/projects/bank-statement-analysis/front-end/dist $1/

    mkdir $1/dist/server
    cp -a /home/tina/Documents/projects/bank-statement-analysis/back-end/dist/* $1/dist/server
fi



