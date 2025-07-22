import { Construct } from "constructs";
import { Function as LambdaFunction } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { CreateLambda } from 'cdk-library-shared/util/cdk';

import * as iam from "aws-cdk-lib/aws-iam";

interface LodgeCrudLambdasProps {
  policyStatements: iam.PolicyStatement[];
}

export class LodgeCrudLambdas extends Construct {
  public readonly createLodgeLambda: LambdaFunction;
  public readonly getAllLodgeLambda: LambdaFunction;
  public readonly getLodgeLambda: LambdaFunction;
  public readonly updateLodgeLambda: LambdaFunction;
  public readonly deleteLodgeLambda: LambdaFunction;
  public readonly getItemLambda: LambdaFunction;
  public readonly getItemsByLodgeLambda: LambdaFunction;
  public readonly createItemLambda: LambdaFunction;
  public readonly updateItemLambda: LambdaFunction;
  public readonly deleteItemLambda: LambdaFunction;
  public readonly createMemberLambda: LambdaFunction;
  public readonly getMemberLambda: LambdaFunction;
  public readonly getMembersByLodgeLambda: LambdaFunction;
  public readonly updateMemberLambda: LambdaFunction;
  public readonly deleteMemberLambda: LambdaFunction;
  public readonly createPaymentLambda: LambdaFunction;
  public readonly getPaymentLambda: LambdaFunction;
  public readonly updatePaymentLambda: LambdaFunction;
  public readonly deletePaymentLambda: LambdaFunction;
  public readonly getPaymentsByLodgeLambda: LambdaFunction;
  public readonly createBillLambda: LambdaFunction;
  public readonly getBillLambda: LambdaFunction;
  public readonly updateBillLambda: LambdaFunction;
  public readonly deleteBillLambda: LambdaFunction;
  public readonly getBillsByLodgeLambda: LambdaFunction;
  public readonly createEventLambda: LambdaFunction;
  public readonly getEventLambda: LambdaFunction;
  public readonly updateEventLambda: LambdaFunction;
  public readonly deleteEventLambda: LambdaFunction;
  public readonly getEventsByLodgeLambda: LambdaFunction;

  constructor(scope: Construct, id: string, props: LodgeCrudLambdasProps) {
    super(scope, id);

    this.createLodgeLambda = CreateLambda(this, "CreateLodgeLambda", {
      path: path.join(__dirname, "../functions/create-lodge.ts"),
    });
    this.getLodgeLambda = CreateLambda(this, "GetLodgeLambda", {
      path: path.join(__dirname, "../functions/get-lodge.ts"),
    });
    this.getAllLodgeLambda = CreateLambda(this, "GetLodgesLambda", {
      path: path.join(__dirname, "../functions/get-lodges.ts"),
    });
    
    this.updateLodgeLambda = CreateLambda(this, "UpdateLodgeLambda", {
      path: path.join(__dirname, "../functions/update-lodge.ts"),
    });
    
    this.deleteLodgeLambda = CreateLambda(this, "DeleteLodgeLambda", {
      path: path.join(__dirname, "../functions/delete-lodge.ts"),
    });

    this.getItemLambda = CreateLambda(this, "GetItemLambda", {
      path: path.join(__dirname, "../functions/get-item.ts"),
    });

    this.getItemsByLodgeLambda = CreateLambda(this, "GetItemsByLodgeLambda", {
      path: path.join(__dirname, "../functions/get-lodges-by-item.ts"),
    });

    this.createItemLambda = CreateLambda(this, "CreateItemLambda", {
      path: path.join(__dirname, "../functions/create-item.ts"),
    });

    this.updateItemLambda = CreateLambda(this, "UpdateItemLambda", {
      path: path.join(__dirname, "../functions/update-item.ts"),
    });

    this.deleteItemLambda = CreateLambda(this, "DeleteItemLambda", {
      path: path.join(__dirname, "../functions/delete-item.ts"),
    });

    this.createMemberLambda = CreateLambda(this, "CreateMemberLambda", {
      path: path.join(__dirname, "../functions/create-member.ts"),
    });

    this.getMemberLambda = CreateLambda(this, "GetMemberLambda", {
      path: path.join(__dirname, "../functions/get-member.ts"),
    });

    this.getMembersByLodgeLambda = CreateLambda(this, "GetMembersByLodgeLambda", {
      path: path.join(__dirname, "../functions/get-members-by-lodge.ts"),
    });

    this.updateMemberLambda = CreateLambda(this, "UpdateMemberLambda", {
      path: path.join(__dirname, "../functions/update-member.ts"),
    });

    this.deleteMemberLambda = CreateLambda(this, "DeleteMemberLambda", {
      path: path.join(__dirname, "../functions/delete-member.ts"),
    });

    this.createPaymentLambda = CreateLambda(this, "CreatePaymentLambda", {
      path: path.join(__dirname, "../functions/create-payment.ts"),
    });

    this.getPaymentLambda = CreateLambda(this, "GetPaymentLambda", {
      path: path.join(__dirname, "../functions/get-payment.ts"),
    });

    this.updatePaymentLambda = CreateLambda(this, "UpdatePaymentLambda", {
      path: path.join(__dirname, "../functions/update-payment.ts"),
    });

    this.deletePaymentLambda = CreateLambda(this, "DeletePaymentLambda", {
      path: path.join(__dirname, "../functions/delete-payment.ts"),
    });

    this.getPaymentsByLodgeLambda = CreateLambda(this, "GetPaymentsByLodgeLambda", {
      path: path.join(__dirname, "../functions/get-payments-by-lodge.ts"),
    });

    this.createBillLambda = CreateLambda(this, "CreateBillLambda", {
      path: path.join(__dirname, "../functions/create-bill.ts"),
    });

    this.getBillLambda = CreateLambda(this, "GetBillLambda", {
      path: path.join(__dirname, "../functions/get-bill.ts"),
    });

    this.updateBillLambda = CreateLambda(this, "UpdateBillLambda", {
      path: path.join(__dirname, "../functions/update-bill.ts"),
    });

    this.deleteBillLambda = CreateLambda(this, "DeleteBillLambda", {
      path: path.join(__dirname, "../functions/delete-bill.ts"),
    });

    this.getBillsByLodgeLambda = CreateLambda(this, "GetBillsByLodgeLambda", {
      path: path.join(__dirname, "../functions/get-bills-by-lodge.ts"),
    });

    this.createEventLambda = CreateLambda(this, "CreateEventLambda", {
      path: path.join(__dirname, "../functions/create-event.ts"),
    });

    this.getEventLambda = CreateLambda(this, "GetEventLambda", {
      path: path.join(__dirname, "../functions/get-event.ts"),
    });

    this.updateEventLambda = CreateLambda(this, "UpdateEventLambda", {
      path: path.join(__dirname, "../functions/update-event.ts"),
    });

    this.deleteEventLambda = CreateLambda(this, "DeleteEventLambda", {
      path: path.join(__dirname, "../functions/delete-event.ts"),
    });

    this.getEventsByLodgeLambda = CreateLambda(this, "GetEventsByLodgeLambda", {
      path: path.join(__dirname, "../functions/get-events-by-lodge.ts"),
    });

    for (const statement of props.policyStatements) {
      this.createLodgeLambda.addToRolePolicy(statement);
      this.getLodgeLambda.addToRolePolicy(statement);
      this.updateLodgeLambda.addToRolePolicy(statement);
      this.deleteLodgeLambda.addToRolePolicy(statement);
      this.getAllLodgeLambda.addToRolePolicy(statement);
      this.getItemLambda.addToRolePolicy(statement);
      this.getItemsByLodgeLambda.addToRolePolicy(statement);
      this.createItemLambda.addToRolePolicy(statement);
      this.updateItemLambda.addToRolePolicy(statement);
      this.deleteItemLambda.addToRolePolicy(statement);
      this.createMemberLambda.addToRolePolicy(statement);
      this.getMemberLambda.addToRolePolicy(statement);
      this.getMembersByLodgeLambda.addToRolePolicy(statement);
      this.updateMemberLambda.addToRolePolicy(statement);
      this.deleteMemberLambda.addToRolePolicy(statement);
      this.createPaymentLambda.addToRolePolicy(statement);
      this.getPaymentLambda.addToRolePolicy(statement);
      this.updatePaymentLambda.addToRolePolicy(statement);
      this.deletePaymentLambda.addToRolePolicy(statement);
      this.getPaymentsByLodgeLambda.addToRolePolicy(statement);
      this.createBillLambda.addToRolePolicy(statement);
      this.getBillLambda.addToRolePolicy(statement);
      this.updateBillLambda.addToRolePolicy(statement);
      this.deleteBillLambda.addToRolePolicy(statement);
      this.getBillsByLodgeLambda.addToRolePolicy(statement);
      this.createEventLambda.addToRolePolicy(statement);
      this.getEventLambda.addToRolePolicy(statement);
      this.updateEventLambda.addToRolePolicy(statement);
      this.deleteEventLambda.addToRolePolicy(statement);
      this.getEventsByLodgeLambda.addToRolePolicy(statement);
    }
  }
}