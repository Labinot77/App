#include <iostream>
using namespace std;

const int n = 15;

struct link {
    int data;
    link* next;
} *gr[n];

void initGraph() {
    for (int i = 0; i < n; i++) {
        gr[i] = NULL;
    }
}

void addEdge(int from, int to) {
    if (from < 0 || from >= n || to < 0 || to >= n) {
        cout << "Невалиден връх!" << endl;
        return;
    }

    link* newNode = new link;

    newNode->data = to;
    newNode->next = gr[from];

    gr[from] = newNode;
}

void printGraph() {
    cout << endl;
    cout << "Граф:" << endl;

    for (int i = 0; i < n; i++) {
        cout << i << " -> ";

        link* current = gr[i];

        while (current != NULL) {
            cout << current->data << " ";
            current = current->next;
        }

        cout << endl;
    }
}

int findMinVertex() {
    bool found = false;
    int minValue = 0;

    for (int i = 0; i < n; i++) {
        if (!found || i < minValue) {
            minValue = i;
            found = true;
        }

        link* current = gr[i];
        while (current != NULL) {

            if (current->data < minValue) {
                minValue = current->data;
            }

            current = current->next;
        }
    }

    return minValue;
}

int main() {
    initGraph();
    int choice;

    do {
        cout << endl;
        cout << "1. Добавяне на ребро" << endl;
        cout << "2. Печат на графа" << endl;
        cout << "3. Минимален връх" << endl;
        cout << "0. Изход" << endl;
        cout << "Избор: " << endl;

        cin >> choice;

        switch (choice) {

        case 1: {
            int from, to;

            cout << "От връх: ";
            cin >> from;

            cout << "До връх: ";
            cin >> to;

            addEdge(from, to);
            break;
        }

        case 2:
            printGraph();
            break;

        case 3:
            cout << "Минимален връх: " << findMinVertex() << endl;
            break;

        case 0:
            cout << "Край." << endl;
            break;

        default:
            cout << "Невалиден избор!" << endl;
        }

    } while (choice != 0);

    return 0;
}