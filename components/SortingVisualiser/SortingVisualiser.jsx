import React from "react";
import './SortingVisualiser.css'

let ARRAY_SIZE = 50;
let NEW_ARRAY_SIZE = 0;
let STANDARD_DELAY = 10;
let SORTED = false;
let SORTING = false;
let inputArray = "";

export default class SortingVisualiser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        
        const newArray = [];
        // console.log('reset:',ARRAY_SIZE)
        for (let i = 0; i < ARRAY_SIZE; i++){
            const newHeight = randomIntFromInterval(20, 600);
            newArray.push(newHeight);
        }
        // console.log('newArray len', newArray.length);
        this.setState({ array: newArray })
        SORTED = false;
    }
    randomise() {
        const array = this.state.array;
        const bars = document.getElementsByClassName('array-bar')
        for (let i = 0; i < ARRAY_SIZE; i++){
            const newHeight = randomIntFromInterval(20, 600);
            array[i] = newHeight;
            bars[i].style.height = `${newHeight}px`;
            bars[i].style.backgroundColor = `darkgrey`;
        }
        // this.setState({sorted:!this.state.sorted})
        SORTED = false;
    }

    generate() {
        const newArray = inputArray.split(',').map((item) => parseInt(item))
        // max height of element is 600px 
        let giveAlert = false;
        newArray.map((item) => {
            if (item > 600) {
                giveAlert = true;
                newArray[newArray.indexOf(item)] = 600;
            } else if (item < 50) {
                giveAlert = true;
                newArray[newArray.indexOf(item)] = 50;
            }
        })
        if (giveAlert) alert('please enter items between 50 and 600');
        
        SORTED = false;
        ARRAY_SIZE = newArray.length;
        this.setState({ array: newArray })
        this.render(); 
    }

    addSweepAnimation(array, animations) {
        const n = array.length;
        for (let x = 0; x < n; x++) {
            animations.push({ type: 's', value: [x, x] });
        }
    }

    playAnimations(bars,animations) {
        const animationLength = animations.length;
        for (let i = 0; i < animationLength; i++){
            const animation = animations[i]; 
            if (animation.type === 'c') {
                const b1style = bars[animation.value[0]].style;
                const b2style = bars[animation.value[1]].style;
                
                
                setTimeout(() => {
                    b1style.backgroundColor = 'green';
                    b2style.backgroundColor = 'green';

                    setTimeout(() => {
                        
                        b1style.backgroundColor = 'darkgrey';
                        b2style.backgroundColor = 'darkgrey';
                        
                    }, STANDARD_DELAY)
                    
                }, i*STANDARD_DELAY)

            }
            else if (animation.type === 'o') {
                const bar = bars[animation.value[0]];
                const barStyle = bar.style;
                const newHeight = animation.value[1];

                setTimeout(() => {
                    barStyle.backgroundColor = 'red'

                    setTimeout(() => {
                        
                        barStyle.height = `${newHeight}px`
                        bar.textContent = newHeight;
                        // console.log(bar.textContent)
                        barStyle.backgroundColor = 'darkgrey';
                        
                    }, STANDARD_DELAY)
                    
                }, i*STANDARD_DELAY)
            }
            else if (animation.type === 's') {
                const barStyle = bars[animation.value[0]].style;
                // console.log(animation.value[0]);
                setTimeout(() => {
                    barStyle.backgroundColor = 'purple';
                    barStyle.opacity = 0.8;
                    
                }, (i+5)*STANDARD_DELAY)
            }
            else if (animation.type === 'swap') {
                const bar1 = bars[animation.value[0]]
                const bar2 = bars[animation.value[1]]
                const b1Style = bar1.style;
                const b2Style = bar2.style;
                setTimeout(() => {
                    b1Style.backgroundColor = 'red'
                    b2Style.backgroundColor = 'red'

                    setTimeout(() => {

                        const temp = b1Style.height;
                        
                        b1Style.height = b2Style.height;
                        bar1.textContent = b2Style.height.slice(0, -2);
                        
                        b2Style.height = temp;
                        bar2.textContent = temp.slice(0, -2);;

                        
                        b1Style.backgroundColor = 'darkGrey'
                        b2Style.backgroundColor = 'darkGrey'
                        
                    }, STANDARD_DELAY)
                    
                }, i*(STANDARD_DELAY))
            }
        }
    }

    insertSort() { 
        if (SORTED) {
            alert('Array is already sorted! try generating new array')
            return;
        }

        const array = this.state.array;
        const bars = document.getElementsByClassName('array-bar');
        let animations = [];

        const n = array.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = array[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < array[j])) {
                animations.push({type:'c',value:[i,j]})
                array[j + 1] = array[j];
                animations.push({type:'o',value:[j+1,array[j]]})
                j--;
            }
            array[j + 1] = current;
            animations.push({type:'o',value:[j+1,current]})
        }
        this.addSweepAnimation(array, animations);
        this.playAnimations(bars, animations)

        // console.log(array);
        SORTED = true;
    }

    mergeSort () {
        if (SORTED) {
            alert('Array is already sorted! try generating new array')
            return;
        }

        let array = this.state.array;
        const bars = document.getElementsByClassName('array-bar');
        let animations = [];
        
        this.mergeSortSplit(0, array.length - 1, animations); 

        this.addSweepAnimation(array,animations)
        this.playAnimations(bars, animations);

        SORTED = true;
    }

    mergeSortSplit(start, end,animations) { 
        const half = Math.floor((start + end) / 2);
        // start and end are index inclusive
        if (end === start) {
            return;
        }
        // split left half till it has single element
        this.mergeSortSplit(start, half,animations);
        // split right half till it has single element
        this.mergeSortSplit(half + 1, end,animations);
        this.mergeSortMerge(start,half,end,animations);
    }

    mergeSortMerge(start, half, end,animations) {
        let array = this.state.array;
        let i = start;
        let j = half + 1;
        let arr = [];
        while (i <= half && j <= end) {
            animations.push({type:'c',value:[i,j]});
            if (array[i] > array[j]) {
                arr.push(array[j]);
                j++;
            } else {
                arr.push(array[i]);
                i++;
            }
        } 
        while (i <= half) {
            animations.push({type:'c',value:[i,i]});
            arr.push(array[i]);
            i++;
        }
        while (j <= end) {
            animations.push({type:'c',value:[j,j]});
            arr.push(array[j]);
            j++;
        }
        
        const arrLength = arr.length;
        for (let k = 0; k < arrLength; k++){
            array[start + k] = arr[k];
            
            animations.push({type:'o',value:[start+k,arr[k]]})
        }
    }
    
    quickSort() {
        if (SORTED) {
            alert('Array is already sorted! try generating new array')
            return;
        }
        
        const array = this.state.array;
        // console.log(array)
        let animations = [];
        const bars = document.getElementsByClassName('array-bar');

        this.quickSortHelper(array, 0, array.length - 1, animations);

        // console.log(array)

        this.addSweepAnimation(array, animations);
        this.playAnimations(bars, animations)
        SORTED = true;
    }
    
    
    quickSortPartition(items, left, right, animations) {
        const pivotIndex = Math.floor((right + left) / 2);
        let pivot   = items[pivotIndex], //middle element
            i       = left, //left pointer
            j       = right; //right pointer
        while (i <= j) {
            while (items[i] < pivot) {
                animations.push({ type:'c',value:[pivotIndex,i]})
                i++;
            }
            while (items[j] > pivot) {
                animations.push({ type:'c',value:[pivotIndex,j]})
                j--;
            }
            if (i <= j) {
                swap(items, i, j); //sawpping two elements
                animations.push({type:'swap',value:[i,j]})
                i++;
                j--;
            }
        }
        return i;
    }
    
    quickSortHelper(items, left, right,animations) {
        var index;
        if (items.length > 1) {
            index = this.quickSortPartition(items, left, right,animations); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                this.quickSortHelper(items, left, index - 1,animations);
            }
            if (index < right) { //more elements on the right side of the pivot
                this.quickSortHelper(items, index, right,animations);
            }
        }
        return items;
    }

    heapSort() {
        if (SORTED) {
            alert('Array is already sorted! try generating new array')
            return;
        }        

        const array = this.state.array;
        let animations = [];
        const bars = document.getElementsByClassName('array-bar');
        
        this.buildMaxHeap(array,array.length,animations);
        this.heapExtractMax(array, animations);
        

        this.addSweepAnimation(array, animations);
        // console.log(animations)
        this.playAnimations(bars, animations)
        
        // console.log(array);

        SORTED = true;
    }

    heapExtractMax(array, animations) {
        const n = array.length;
        for (let i = n - 1; i >= 0; i--){
            swap(array, 0, i);
            animations.push({type: 'swap',value:[0,i]})
            this.maxHeapify(array,i,0,animations)
        }
    }

    maxHeapify(array, n , i,animations) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        let largest = i;

        if (left < n) {
            if (array[left] > array[largest]){
                animations.push({type:'c',value:[left,largest]})
                largest = left;
            }
        }

        if (right < n) {
            if (array[right] > array[largest]) {
                animations.push({type:'c',value:[right,largest]})
                largest = right;
            }
        }
        if (largest !== i) {
            // console.log('before',array[i],array[largest])
            swap(array, i, largest);
            animations.push({type:'swap',value:[i,largest]})
            // console.log('after',array[i],array[largest])
            this.maxHeapify(array,n, largest,animations);
        }
    }
    
    buildMaxHeap(array, n, animations) {
        
        for (let i = parseInt(n / 2 - 1); i >= 0; i--){
            this.maxHeapify(array,n, i,animations);
        }
    }

    bubbleSort() {
        if (SORTED) {
            alert('Array is already sorted! try generating new array')
            return;
        }

        const array = this.state.array;
        const n = array.length;
        let animations = []
        const bars = document.getElementsByClassName('array-bar')

        for (let i = 0; i < n; i++){
            let change = false;
            for (let j = 0; j < (array.length - i - 1); j++){
                animations.push({type:'c',value:[j,j+1]})
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1);
                    animations.push({type:'swap',value:[j,j+1]})
                    change = true;
                }
            }
 
            if (!change) {
                break; // because array is sorted now
            }
        }

        // console.log(array)
        this.addSweepAnimation(array, animations);
        // console.log(animations)
        this.playAnimations(bars,animations);

        SORTED = true;
     }

    rangeSlide = (evt) => {
        NEW_ARRAY_SIZE = Math.floor(evt.target.value);
    
        ARRAY_SIZE = NEW_ARRAY_SIZE;
        // console.log(ARRAY_SIZE);
        this.resetArray();
        this.render();
        
        STANDARD_DELAY = Math.floor(500/ARRAY_SIZE)
    }

    inputArrayChange = (evt) => {
        inputArray = evt.target.value;
    }

    render() {
        const { array } = this.state;
        // console.log('render len',array.length)

        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < bars.length; i++){
            bars[i].style.backgroundColor = 'darkgray';
        }
            
        return (
            <>
                <div className="header">

                    <input
                        type="text"
                        id="inputField"
                        className="inputField"
                        onChange={this.inputArrayChange}
                        // value={inputArray}
                    />
                    <button onClick={() => this.generate()}
                        className="btn"
                        disabled={SORTING}>
                        Generate
                    </button>
                    <button onClick={() => this.randomise()}
                        className="btn"
                        disabled={SORTING}>
                        Randomise
                    </button>
                    <button onClick={() => this.insertSort()} 
                        className="btn"
                        disabled={SORTING}>
                        Insertion Sort
                    </button>
                    <button onClick={() => this.mergeSort()} 
                        className="btn"
                        disabled={SORTING}>
                        Merge Sort
                    </button>
                    <button onClick={() => this.quickSort()} 
                        className="btn"
                        disabled={SORTING}>
                        Quick Sort
                    </button>
                    <button onClick={() => this.heapSort()} 
                        className="btn"
                        disabled={SORTING}>
                        Heap Sort
                    </button>
                    <button onClick={() => this.bubbleSort()} 
                        className="btn"
                        disabled={SORTING}>
                        Bubble Sort
                    </button>
                    
                    <input type="range" min="10" max="100" className="slider" id='slider'
                        onChange={this.rangeSlide} disabled={SORTING} />
                    
                    
                </div>

                <div className="bar-container" id="bar-container1">
                    {array.map((value, index) => (
                        <div className="array-bar" key={index}
                            style={{
                                height: `${value}px`,
                                width: `${Math.floor(1000 / ARRAY_SIZE)}px`,
                                fontSize: `${Math.floor(400 / ARRAY_SIZE)}px`,
                            }}>
                            {value}
                        </div>
                    ))}
                </div>

            </>
        )
    }
}

function randomIntFromInterval(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}